import { getStudentTimetable,
         getModuleTimetable,
         getModuleCount,
         getProgrammeModules,
         getModuleTypeTimetable
} from './db';

const checkClash = (currentTimetable, moduleTimetable) => {
  for (const moduleobj of currentTimetable) {
    for (const reqobj of moduleTimetable) {
      if ((reqobj.day === moduleobj.day) && (moduleobj.starttime <= reqobj.starttime && moduleobj.endtime >= reqobj.endtime)) {
        console.log('CLASH');
        return false;
      }
    }
  }
  console.log('NO CLASH');
  console.log(currentTimetable);
  console.log(moduleTimetable);
  return true;
};

async function checkModuleSpace(moduleCode) {
  const data = await getModuleCount(moduleCode);
  for (const mod of data) {
    if ((mod.capacity - mod.count) < 1) return false;
  }
  return true;
}

async function checkGroupSpace(moduleCode, groupnumber) {
  const data = await getModuleCount(moduleCode);
  const result = data.filter(( obj ) => (obj.groupnumber === groupnumber));
  if ((result[0].capacity - result[0].count) < 1) return false;
  return true;
}

async function checkModuleInProgramme(studentid, newModule) {
  const data = await getProgrammeModules(studentid);
  const result = data.find(x => x.code === newModule);
  if (result === undefined) return false;
  return true;
}

const changeGroup = (currentTimetable, newGroups, moduleTimetable) => {
  for (const group of newGroups) {
    let timetable = currentTimetable.filter((x) => (x.code === group.code));
    timetable = timetable.filter((x) => (x.name !== group.name));
    timetable.push(group);
    if (checkClash(timetable, moduleTimetable)) return true;
  }
  return null;
};

async function reassign(studentid, currentTimetable, moduleTimetable) {
  for (const mod of currentTimetable) {
    const otherGroups = await getModuleTypeTimetable(mod.code, mod.groupnumber, mod.name);
    if (otherGroups.length > 0 && await checkGroupSpace(otherGroups[0].code, otherGroups[0].groupnumber)) {
      // means we have found another group to assign studnet
      // check if new group has space
      return changeGroup(currentTimetable, otherGroups, moduleTimetable);
    }
  }
  throw new Error('No reassignment possible');
}

export async function decideSwap(studentid, oldModule, newModule) {
  try {
    // check if new module is in programme
    if (await !checkModuleSpace(newModule) || await !checkModuleInProgramme(studentid, newModule)) return false;
    let currentTimetable = await getStudentTimetable(studentid);
    currentTimetable = currentTimetable.filter((x) => (x.code !== oldModule));
    const moduleTimetable = await getModuleTimetable(newModule);

    if (!checkClash(currentTimetable, moduleTimetable)) {
      return await reassign(studentid, currentTimetable, moduleTimetable);
    }
    return true;
  } catch (err) {
    throw new Error(err);
  }
}
