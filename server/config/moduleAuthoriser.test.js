/* eslint-disable func-names */
import  { checkModuleSpace,
          checkGroupSpace,
          checkModuleInProgramme,
          checkClash,
          changeGroup
} from './moduleAuthoriser';
import sinon from 'sinon';

describe('moduleAuthoriser', () => {
  describe('checkClash', () => {
    it('returns true if there are no clashes in day', () => {
      const currentTimetable = [
        {
          day: 'Mon',
          starttime: '08:00',
          endtime: '09:00'
        }
      ];
      const moduleTimetable = [
        {
          day: 'Tue',
          starttime: '08:00',
          endtime: '09:00'
        }
      ];

      const result = checkClash(currentTimetable, moduleTimetable);
      expect(result).to.be.true();
    });

    it('returns true if there are no clashes in time', () => {
      const currentTimetable = [
        {
          day: 'Mon',
          starttime: '08:00',
          endtime: '09:00'
        }
      ];
      const moduleTimetable = [
        {
          day: 'Mon',
          starttime: '09:00',
          endtime: '10:00'
        }
      ];

      const result = checkClash(currentTimetable, moduleTimetable);
      expect(result).to.be.true();
    });

    it('returns true if there are no clashes with multiple items', () => {
      const currentTimetable = [
        {
          day: 'Mon',
          starttime: '08:00',
          endtime: '09:00'
        },
        {
          day: 'Tue',
          starttime: '08:00',
          endtime: '09:00'
        }
      ];
      const moduleTimetable = [
        {
          day: 'Mon',
          starttime: '09:00',
          endtime: '10:00'
        }
      ];

      const result = checkClash(currentTimetable, moduleTimetable);
      expect(result).to.be.true();
    });

    it('returns false if there are clashes', () => {
      const currentTimetable = [
        {
          day: 'Mon',
          starttime: '08:00',
          endtime: '09:00'
        }
      ];
      const moduleTimetable = [
        {
          day: 'Mon',
          starttime: '08:00',
          endtime: '10:00'
        }
      ];

      const result = checkClash(currentTimetable, moduleTimetable);
      expect(result).to.be.false();
    });
  });

  describe('checkModuleSpace', () => {
    it('returns false if there is no space for a module', async function() {
      const module = [
        {
          capacity: 10,
          count: 10,
        }
      ];
      const getCount = sinon.stub().resolves(module);
      const result = await checkModuleSpace('testCode', getCount);
      expect(result).to.be.false();
    });

    it('returns true if there is space for a module', async function() {
      const module = [
        {
          capacity: 12,
          count: 10,
        }
      ];
      const getCount = sinon.stub().resolves(module);
      const result = await checkModuleSpace('testCode', getCount);
      expect(result).to.be.true();
    });
  });

  describe('checkGroupSpace', () => {
    it('returns false if there is no space for a group', async function() {
      const groups = [
        {
          groupnumber: 1,
          capacity: 10,
          count: 10,
        }
      ];
      const getCount = sinon.stub().resolves(groups);
      const result = await checkGroupSpace('testCode', 1, getCount);
      expect(result).to.be.false();
    });

    it('returns false if group is not found', async function() {
      const groups = [
        {
          groupnumber: 2,
          capacity: 11,
          count: 10,
        }
      ];
      const getCount = sinon.stub().resolves(groups);
      const result = await checkGroupSpace('testCode', 1, getCount);
      expect(result).to.be.false();
    });

    it('returns true if there is space for in a group', async function() {
      const groups = [
        {
          groupnumber: 1,
          capacity: 11,
          count: 10,
        }
      ];
      const getCount = sinon.stub().resolves(groups);
      const result = await checkGroupSpace('testCode', 1, getCount);
      expect(result).to.be.true();
    });
  });

  describe('checkModuleInProgramme', () => {
    it('returns false if module is not in programme', async function() {
      const modules = [
        {
          code: 2,
        },
        {
          code: 3,
        },
      ];
      const getProgrammeModules = sinon.stub().resolves(modules);
      const result = await checkModuleInProgramme('testid', 1, getProgrammeModules);
      expect(result).to.be.false();
    });

    it('returns false if group is not found', async function() {
      const modules = [
        {
          code: 2,
        },
        {
          code: 1,
        },
      ];
      const getProgrammeModules = sinon.stub().resolves(modules);
      const result = await checkModuleInProgramme('testid', 1, getProgrammeModules);
      expect(result).to.be.true();
    });
  });

  describe('checkModuleInProgramme', () => {
    it.only('returns false if module is not in programme', () => {
      const newGroups = [
        {
          code: 2,
          name: 'Tutorial',
        },
        {
          code: 3,
          name: 'Lab',
        },
      ];

      const timetable = [
        {
          code: 2,
          name: 'Lecture',
        },
        {
          code: 4,
          name: 'Lab',
        },
      ];
      const checkClashFn = sinon.stub().resolves(true);
      const result = changeGroup(timetable, newGroups, null, checkClashFn);
      expect(result).to.be.false();
    });

    it('returns false if group is not found', () => {
      const modules = [
        {
          code: 2,
        },
        {
          code: 1,
        },
      ];
      const getProgrammeModules = sinon.stub().resolves(modules);
      const result = changeGroup('testid', 1, getProgrammeModules);
      expect(result).to.be.true();
    });
  });
});
