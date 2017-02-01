/* eslint-disable func-names */
import { getStudentTimetable,
         getModuleTimetable,
         getModuleCount,
         getProgrammeModules,
         getModuleTypeTimetable
} from './db';

describe('database', () => {
  describe('getStudentTimetable', () => {
    const testData = 'test';

    let databaseMock;
    let queryPromise;
    beforeEach(() => {
      queryPromise = sinon.stub();
      databaseMock = {
        query: queryPromise,
      };
    });

    it('Returns a promise', () => {
      queryPromise.resolves({ rows: testData });
      const result = getStudentTimetable(testData, databaseMock);
      expect(result).to.be.an.instanceof(Promise);
    });

    it('Rejects if the database returns an error', async function() {
      const callbackSpy = sinon.spy();
      queryPromise.rejects(new Error('test error'));
      try {
        await getStudentTimetable(testData, databaseMock);
      } catch (err) {
        callbackSpy(err.message);
      }
      expect(callbackSpy).to.be.calledWith('[BadGateway] test error');
    });

    it('Returns a students current timetable', async function() {
      queryPromise.resolves({ rows: testData });
      const data = await getStudentTimetable(testData, databaseMock);
      expect(data).to.deep.equal(testData);
    });
  });

  describe('getModuleTypeTimetable', () => {
    const moduleCode = 'tesCode';
    const groupNumber = 1;
    const name = 'testName';

    let databaseMock;
    let queryPromise;
    beforeEach(() => {
      queryPromise = sinon.stub();
      databaseMock = {
        query: queryPromise,
      };
    });

    it('Returns a promise', () => {
      queryPromise.resolves({ rows: {moduleCode, groupNumber, name}});
      const result = getModuleTypeTimetable(moduleCode, groupNumber, name, databaseMock);
      expect(result).to.be.an.instanceof(Promise);
    });

    it('Rejects if the database returns an error', async function() {
      const callbackSpy = sinon.spy();
      queryPromise.rejects(new Error('test error'));
      try {
        await getModuleTypeTimetable(moduleCode, groupNumber, name, databaseMock);
      } catch (err) {
        callbackSpy(err.message);
      }
      expect(callbackSpy).to.be.calledWith('[BadGateway] test error');
    });

    it('Returns a students current timetable', async function() {
      queryPromise.resolves({ rows: {moduleCode, groupNumber, name}});
      const data = await getModuleTypeTimetable(moduleCode, groupNumber, name, databaseMock);
      expect(data).to.deep.equal({moduleCode, groupNumber, name});
    });
  });

  describe('getModuleCount', () => {
    const testData = 'test';

    let databaseMock;
    let queryPromise;
    beforeEach(() => {
      queryPromise = sinon.stub();
      databaseMock = {
        query: queryPromise,
      };
    });

    it('Returns a promise', () => {
      queryPromise.resolves({ rows: testData });
      const result = getModuleCount(testData, databaseMock);
      expect(result).to.be.an.instanceof(Promise);
    });

    it('Rejects if the database returns an error', async function() {
      const callbackSpy = sinon.spy();
      queryPromise.rejects(new Error('test error'));
      try {
        await getModuleCount(testData, databaseMock);
      } catch (err) {
        callbackSpy(err.message);
      }
      expect(callbackSpy).to.be.calledWith('[BadGateway] test error');
    });

    it('Returns a students current timetable', async function() {
      queryPromise.resolves({ rows: testData });
      const data = await getModuleCount(testData, databaseMock);
      expect(data).to.deep.equal(testData);
    });
  });

  describe('getModuleTimetable', () => {
    const testData = 'test';

    let databaseMock;
    let queryPromise;
    beforeEach(() => {
      queryPromise = sinon.stub();
      databaseMock = {
        query: queryPromise,
      };
    });

    it('Returns a promise', () => {
      queryPromise.resolves({ rows: testData });
      const result = getModuleTimetable(testData, databaseMock);
      expect(result).to.be.an.instanceof(Promise);
    });

    it('Rejects if the database returns an error', async function() {
      const callbackSpy = sinon.spy();
      queryPromise.rejects(new Error('test error'));
      try {
        await getModuleTimetable(testData, databaseMock);
      } catch (err) {
        callbackSpy(err.message);
      }
      expect(callbackSpy).to.be.calledWith('[BadGateway] test error');
    });

    it('Returns a students current timetable', async function() {
      queryPromise.resolves({ rows: testData });
      const data = await getModuleTimetable(testData, databaseMock);
      expect(data).to.deep.equal(testData);
    });
  });

  describe('getProgrammeModules', () => {
    const testData = 'test';

    let databaseMock;
    let queryPromise;
    beforeEach(() => {
      queryPromise = sinon.stub();
      databaseMock = {
        query: queryPromise,
      };
    });

    it('Returns a promise', () => {
      queryPromise.resolves({ rows: testData });
      const result = getProgrammeModules(testData, databaseMock);
      expect(result).to.be.an.instanceof(Promise);
    });

    it('Rejects if the database returns an error', async function() {
      const callbackSpy = sinon.spy();
      queryPromise.rejects(new Error('test error'));
      try {
        await getProgrammeModules(testData, databaseMock);
      } catch (err) {
        callbackSpy(err.message);
      }
      expect(callbackSpy).to.be.calledWith('[BadGateway] test error');
    });

    it('Returns a students current timetable', async function() {
      queryPromise.resolves({ rows: testData });
      const data = await getProgrammeModules(testData, databaseMock);
      expect(data).to.deep.equal(testData);
    });
  });
});
