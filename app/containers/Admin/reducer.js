const getInitialState = () => ({
  loading: false,
  programmes: [],
});

import {
  PROGRAMMES_SUCCESS,
  PROGRAMMES_REQUEST,
  PROGRAMMES_FAIL,
  DATA_SUCCESS,
} from './actions';

const adminReducer = (state = getInitialState(), action) => {
  switch (action && action.type) {
  case DATA_SUCCESS:
    const colors = ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#6d4c41', '#9c27b0'];
    const newData = {
      labels: action.data.moduleData.map((x) => x.newmodule),
      datasets: [{
        label: 'Which Modules were chosen the most',
        backgroundColor: colors,
        data: action.data.moduleData.map((x) => (x.newcount / action.data.sumNew) * 100)
      }]
    };

    const oldData = {
      labels: action.data.moduleData.map((x) => x.oldmodule),
      datasets: [{
        label: 'Which Modules were dropped the most',
        backgroundColor: colors,
        data: action.data.moduleData.map((x) => (x.oldcount / action.data.sumOld) * 100),
      }]
    };

    return {
      ...state,
      newData,
      oldData,
      loading: false,
    };
  case PROGRAMMES_SUCCESS:
    return {
      ...state,
      programmes: action.programmes,
      loading: false,
    };
  case PROGRAMMES_REQUEST:
    return {
      ...state,
      loading: true,
    };
  case PROGRAMMES_FAIL:
    return {
      ...state,
      loading: false,
    };
  default:
    return state;
  }
};

export default adminReducer;
