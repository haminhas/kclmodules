  const getCurrentTimetable = [
    [
      {
        module: 'module1',
        name: 'lecture1',
        startTime: 12,
        endTime: 15,
        day: 'Mon',
      },
      {
        module: 'module1',
        name: 'lab1',
        startTime: 12,
        endTime: 15,
        day: 'Thu',
      },
    ],

    [
      {
        module: 'module2',
        name: 'lecture2',
        startTime: 12,
        endTime: 15,
        day: 'Tue',
      },
      {
        module: 'module2',
        name: 'lab2',
        startTime: 12,
        endTime: 15,
        day: 'Wed',
      },
    ]
  ];

  const getRequestedTimetable = [
    {
      module: 'module3',
      name: 'lecture3',
      startTime: 11,
      endTime: 15,
      day: 'Fri',
    },
    {
      module: 'module3',
      name: 'sgt3',
      startTime: 10,
      endTime: 11,
      day: 'Fri',
    },
  ];

  const checkClash = (currentTimetable, requestedTimetable) => {
    for (const moduleobj of currentTimetable) {
      for (const obj of moduleobj) {
        for (const reqobj of requestedTimetable) {
          if ((reqobj.day === obj.day) && (obj.startTime <= reqobj.startTime || obj.endTime >= reqobj.endTime)) {
            console.log('CLASH');
            return false;
          }
        }
      }
    }
    console.log('NO CLASH');
    return true;
  };

  export const decideSwap = (studentid, swapModule, requestedTimetable = getRequestedTimetable, currentTimetable = getCurrentTimetable) => {
    // first get rid of the module that is being removed
    currentTimetable.splice(swapModule, 1);
    checkClash(currentTimetable, requestedTimetable);
    // now check for clashes
  };
