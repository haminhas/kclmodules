import { checkClash } from './moduleAuthoriser';

describe.only('moduleAuthoriser', () => {
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
});
