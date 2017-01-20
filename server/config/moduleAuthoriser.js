import { getStudentTimetable, getModuleTimetable, getModuleCount, getProgrammeModules } from './db';

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
  return true;
};

async function checkModuleSpace(moduleCode) {
  const data = await getModuleCount(moduleCode);
  for (const mod of data) {
    if ((mod.capacity - mod.count) < 1) return false;
  }
  return true;
}

async function checkModuleInProgramme(studentid, newModule) {
  const data = await getProgrammeModules(studentid);
  const result = data.find(x => x.code === newModule);
  if (result === undefined) return false;
  return true;
}

// async function reassign(studentid, currentTimetable) {
//   // console.log(currentTimetable);
//   // for (const mod of currentTimetable) {
//   //   const otherGroups = await getModuleTimetable(mod.modulecode);
//   //   if (otherGroups.length > 0) {
//   //     console.log(otherGroups);
//   //   }
//   // }
// }


export async function decideSwap(studentid, oldModule, newModule) {
  try {
    // check if new module is in programme
    if (await !checkModuleSpace(newModule) || await !checkModuleInProgramme(studentid, newModule)) return false;
    let currentTimetable = await getStudentTimetable(studentid);
    currentTimetable = currentTimetable.filter((x) => (x.code !== oldModule));
    const moduleTimetable = await getModuleTimetable(newModule);

    if (!checkClash(currentTimetable, moduleTimetable)) {
      // const arr = await reassign(studentid, currentTimetable);
      // return arr;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
}
