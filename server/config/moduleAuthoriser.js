// require("babel-core").transform("code", {
//   plugins: ["transform-async-to-generator"]
// });

import { getStudentTimetable,
         getModuleTimetable,
         getModuleCount,
         getProgrammeModules,
         getModuleTypeTimetable
} from './db';

let finalTimetable = '';

export const checkClash = (currentTimetable, moduleTimetable) => {
  for (const moduleobj of currentTimetable) {
    for (const reqobj of moduleTimetable) {
      if ((reqobj.day.toLowerCase() === moduleobj.day.toLowerCase()) &&
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
  // console.log(currentTimetable.concat(moduleTimetable));
  finalTimetable = currentTimetable.concat(moduleTimetable);
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
  if (result === undefined) return true;
  return false;
}

export const changeGroup = (currentTimetable, newGroup, moduleTimetable) => {
  let timetable = currentTimetable.filter((x) => (x.code === newGroup.code));
  timetable = timetable.filter((x) => (x.name !== newGroup.name));
  timetable.push(newGroup);
  if (checkClash(timetable, moduleTimetable)) return true;
  return false;
};

// method for looping over groups in currentTimetable
async function reassign(currentTimetable, moduleTimetable) {
  for (const mod of currentTimetable) {
    const otherGroups = await getModuleTypeTimetable(mod.code, mod.groupnumber, mod.name);
    for (const group of otherGroups) {
      if (await checkGroupSpace(group.code, group.groupnumber)) {
        // means we have found another group to assign studnet
        // check if new group has space
        return changeGroup(currentTimetable, group, moduleTimetable);
      }
    }
  }
  return false;
}

export const groupArrays = (moduleTimetable) => {
  const newMod = [];
  const names = [];
  for (let i = 0; i < moduleTimetable.length; i++) {
    if (names.includes(moduleTimetable[i].name)) continue;
    const timetable = moduleTimetable.filter((x) => (x.name === moduleTimetable[i].name));
    newMod.push(timetable);
    names.push(timetable[0].name);
  }
  return newMod;
};

// method for looping over all groups in newModule
async function checkModuleGroups(currentTimetable, moduleTimetable) {
  const newMod = groupArrays(moduleTimetable);
  const option = [];

// initliase the array with the first group for each type
  for (let i = 0; i < newMod.length; i++) {
    option.push(newMod[i][0]);
  }

  for (let i = 0; i < newMod.length; i++) {
    for (let j = 0; j < newMod[i].length; j++) {
      if (await checkGroupSpace(newMod[i][j].code, newMod[i][j].groupnumber)) {
        option[i] = newMod[i][j];
        if (!checkClash(currentTimetable, option)) {
          const res = await reassign(currentTimetable, option);
          if (res) return true;
        } else {
          return true;
        }
      }
    }
  }
  return false;
}

export async function decideSwap(studentid, oldModules, newModules) {
  try {
    // check if new module is in programme
    for (const mod of newModules) {
      if (await checkModuleInProgramme(studentid, mod)) return false;
    }
    let currentTimetable = await getStudentTimetable(studentid);
    for (const mod of oldModules) {
      currentTimetable = currentTimetable.filter((x) => (x.code !== mod));
    }
    const moduleTimetables = [];
    for (const mod of newModules) {
      const response = await getModuleTimetable(mod);
      if (response.length > 0) moduleTimetables.push(response);
    }
    for (const mod of moduleTimetables) {
      const response = await checkModuleGroups(currentTimetable, mod);
      if (!response) return false;
      currentTimetable = finalTimetable;
    }
    return [true, finalTimetable];
  } catch (err) {
    throw new Error(err);
  }
}

export default decideSwap;
