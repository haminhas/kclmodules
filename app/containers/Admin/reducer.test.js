import projectsReducer from './reducer';

import {
  DATA_SUCCESS,
  PROGRAMMES_SUCCESS,
  PROGRAMMES_REQUEST,
  PROGRAMMES_FAIL,
} from './actions';

const initialState = {
  loading: false,
  programmes: [],
};

const programmesData = {
  loading: false,
  programmes: [
    {
      programmeName: 'programmeName1',
      id: 0,
    },
    {
      programmeName: 'programmeName2',
      id: 2,
    },
  ],
};

const graphData = {
  moduleData: [
    {
      newcount: '1',
      newmodule: '4CCS1CS1',
      oldcount: '1',
      oldmodule: '5CCS2PLD',
    }
  ],
  sumNew: 2,
  sumOld: 2,
};

describe('Admin reducer', () => {
  it('has initial state of an empty array of programmes and loading false', () => {
    const expectedState = {
      loading: false,
      programmes: [],
    };
    const actualState = projectsReducer(undefined, {});
    expect(actualState).to.deep.equal(expectedState);
  });

  it('sets state to programmes on PROGRAMMES_SUCCESS and loading to false', () => {
    const initialStateTrue = {
      loading: true,
      programmes: [],
    };
    const expectedState = {
      loading: false,
      programmes: programmesData.programmes,
    };
    const action = {
      type: PROGRAMMES_SUCCESS,
      programmes: programmesData.programmes,
    };
    const actualState = projectsReducer(initialStateTrue, action);
    expect(actualState).to.deep.equal(expectedState);
  });

  it('sets loading to true on PROGRAMMES_REQUEST', () => {
    const expectedState = {
      loading: true,
      programmes: [],
    };
    const action = {
      type: PROGRAMMES_REQUEST,
    };
    const actualState = projectsReducer(initialState, action);
    expect(actualState).to.deep.equal(expectedState);
  });

  it('sets loading to false on PROGRAMMES_FAIL', () => {
    const expectedState = {
      loading: false,
      programmes: [],
    };
    const action = {
      type: PROGRAMMES_FAIL,
    };
    const actualState = projectsReducer(initialState, action);
    expect(actualState).to.deep.equal(expectedState);
  });

  it('sets state to oldData and newData on DATA_SUCCESS and loading to false', () => {
    const initialStateTrue = {
      loading: true,
      programmes: programmesData.programmes,
    };
    const expectedState = {
      loading: false,
      programmes: programmesData.programmes,
      oldData: {
        labels: [ '5CCS2PLD' ],
        datasets: [
          {
            label: 'Which Modules were dropped the most',
            backgroundColor: ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#6d4c41', '#9c27b0'],
            data: [50]
          }
        ]
      },
      newData: {
        labels: [ '4CCS1CS1' ],
        datasets: [
          {
            label: 'Which Modules were chosen the most',
            backgroundColor: ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#6d4c41', '#9c27b0'],
            data: [50]
          }
        ]
      }
    };
    const action = {
      type: DATA_SUCCESS,
      programmes: programmesData.programmes,
      data: graphData,
    };
    const actualState = projectsReducer(initialStateTrue, action);
    expect(actualState).to.deep.equal(expectedState);
  });
});
