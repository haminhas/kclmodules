import { getStudentTimetable, getModuleTimetable } from './db';

const checkClash = (currentTimetable, moduleTimetable) => {
  // console.log(currentTimetable);
  // console.log(moduleTimetable);
  for (const moduleobj of currentTimetable) {
    for (const reqobj of moduleTimetable) {
      console.log(moduleobj.endtime >= reqobj.endtime);
      if ((reqobj.day === moduleobj.day) && (moduleobj.starttime <= reqobj.starttime && moduleobj.endtime >= reqobj.endtime)) {
        console.log('CLASH');
        return false;
      }
    }
  }
  console.log('NO CLASH');
  return true;
};

export async function decideSwap(studentid, oldModule, newModule) {
  try {
    // check if new module is in programme
    const currentTimetable = await getStudentTimetable(studentid);
    const index = currentTimetable.findIndex((o) => ( o.modulecode === oldModule ));
    currentTimetable.splice(index, 1);
    const moduleTimetable = await getModuleTimetable(newModule);
    checkClash(currentTimetable, moduleTimetable);
  } catch (err) {
    console.log(err);
  }
}
