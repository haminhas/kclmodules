import { getStudentTimetable,
         getModuleTimetable,
         getModuleCount,
         getProgrammeModules,
         getModuleTypeTimetable
} from './db';

export const checkClash = (currentTimetable, moduleTimetable) => {
  for (const moduleobj of currentTimetable) {
    for (const reqobj of moduleTimetable) {
      if ((reqobj.day === moduleobj.day) &&
      ((moduleobj.starttime <= reqobj.starttime &&
        moduleobj.endtime >= reqobj.endtime) ||
      (moduleobj.starttime >= reqobj.starttime &&
        moduleobj.endtime <= reqobj.endtime)
      )) {
        console.log('CLASH');
        return false;
      }
    }
  }
  console.log('NO CLASH');
  console.log(currentTimetable.concat(moduleTimetable));
  return true;
};

export async function checkGroupSpace(
  moduleCode,
  groupnumber,
  getModuleCountFn = getModuleCount
) {
  const data = await getModuleCountFn(moduleCode);
  const result = data && data.filter(( obj ) => (obj.groupnumber === groupnumber));
  if (result.length === 0 || (result[0].capacity - result[0].count) < 1) return false;
  return true;
}

export async function checkModuleInProgramme(
  studentid,
  newModule,
  getProgrammeModulesFn = getProgrammeModules
) {
  const data = await getProgrammeModulesFn(studentid);
  const result = data.find(x => x.code === newModule);
  if (result === undefined) return false;
  return true;
}

export const changeGroup = (currentTimetable, newGroups, moduleTimetable ) => {
  for (const group of newGroups) {
    // console.log(currentTimetable);
    // console.log(newGroups);
    // console.log(moduleTimetable);
    let timetable = currentTimetable.filter((x) => (x.code === group.code));
    timetable = timetable.filter((x) => (x.name !== group.name));
    timetable.push(group);
    if (checkClash(timetable, moduleTimetable)) return true;
    return false;
  }
  throw new Error('Error at changeGroup');
};

async function reassign(currentTimetable, moduleTimetable) {
  for (const mod of currentTimetable) {
    const otherGroups = await getModuleTypeTimetable(mod.code, mod.groupnumber, mod.name);
    if (otherGroups.length > 0 &&
      await checkGroupSpace(otherGroups[0].code, otherGroups[0].groupnumber)) {
      // means we have found another group to assign studnet
      // check if new group has space
      return changeGroup(currentTimetable, otherGroups, moduleTimetable);
    }
  }
  throw new Error('No reassignment possible');
}

async function checkModuleGroups(currentTimetable, moduleTimetable) {
  const newMod = [];
  const names = [];
  for (let i = 0; i < moduleTimetable.length; i++) {
    if (names.includes(moduleTimetable[i].name)) continue;
    const timetable = moduleTimetable.filter((x) => (x.name === moduleTimetable[i].name));
    newMod.push(timetable);
    names.push(timetable[0].name);
  }

  const option = [];

  for (let i = 0; i < newMod.length; i++) {
    option.push(newMod[i][0]);
  }

  for (let i = 0; i < newMod.length; i++) {
    for (let j = 0; j < newMod[i].length; j++) {
      if (await checkGroupSpace(newMod[i][j].code, newMod[i][j].groupnumber)) {
        option[i] = newMod[i][j];
        if (!checkClash(currentTimetable, option)) {
          return await reassign(currentTimetable, moduleTimetable);
        }
        return true;
      }
    }
  }
  throw new Error('Error has occured');
}

export async function decideSwap(studentid, oldModule, newModule) {
  try {
    // check if new module is in programme
    if (await !checkModuleInProgramme(studentid, newModule)) return false;
    let currentTimetable = await getStudentTimetable(studentid);
    currentTimetable = currentTimetable.filter((x) => (x.code !== oldModule));
    const moduleTimetable = await getModuleTimetable(newModule);
    return await checkModuleGroups(currentTimetable, moduleTimetable);
  } catch (err) {
    throw new Error(err);
  }
}

export default decideSwap;
