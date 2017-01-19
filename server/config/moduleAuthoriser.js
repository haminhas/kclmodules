import { getStudentTimetable, getModuleTimetable, getModuleCount, getProgrammeModules } from './db';

const checkClash = (currentTimetable, moduleTimetable) => {
  // console.log(currentTimetable);
  // console.log(moduleTimetable);
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
  return data[0].capacity - data[0].count;
}

async function checkModuleInProgramme(studentid, newModule) {
  const data = await getProgrammeModules(studentid);
  const result = data.find(x => x.modulecode === newModule);
  if (result === undefined) return true;
  return false;
}

export async function decideSwap(studentid, oldModule, newModule) {
  try {
    // check if new module is in programme
    if (await checkModuleSpace(newModule) < 1 || await checkModuleInProgramme(studentid, newModule)) return false;
    const currentTimetable = await getStudentTimetable(studentid);
    const index = currentTimetable.findIndex((o) => ( o.modulecode === oldModule ));
    currentTimetable.splice(index, 1);
    const moduleTimetable = await getModuleTimetable(newModule);
    return checkClash(currentTimetable, moduleTimetable);
  } catch (err) {
    throw new Error(err);
  }
}
