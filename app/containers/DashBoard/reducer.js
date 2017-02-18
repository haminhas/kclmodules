import {
  GET_USERID_REQUEST,
  GET_USERID_SUCCESS,
  GET_USERID_FAIL,
  GET_MODULES_SUCCESS,
  GET_MODULES_FAIL,
  CHECK_CLASH_SUCCESS,
  CHECK_CLASH_FAIL,
  CHECK_CLASH_REQUEST,
  GET_MODULE_TIMETABLE_SUCCESS,
  GET_MODULE_TIMETABLE_FAIL,
  AMEDNMENT_SUCCESS,
  AMEDNMENT_FAIL,
  MODULE_ON_CHANGE,
  SPEC_SUCCESS,
} from './actions';

const getInitialState = () => ({
  userID: '',
  loading: true,
  firstClash: false,
  checkClash: false,
  checkClashLoading: false,
  modulesInvalid: true,
});

const invalid = (state) => {
  const newM = state.newModules.filter((x) => x.checked);
  const old = state.oldModules.filter((x) => x.checked);
  console.log(newM.length === old.length);
  if (newM.length === old.length && newM.length > 0 && old.length > 0) {
    return false;
  }
  return true;
};

const mod = (action) => {
  for (let i = 0; i < action.modules[0].length; i++) {
    action.modules[1] = action.modules[1].filter((x) =>
      x.code !== action.modules[0][i].code
    );
  }

  console.log(action);


  for (const obj of action.modules[0]) {
    obj.checked = false;
  }

  for (const obj of action.modules[1]) {
    obj.checked = false;
  }
};

const dashBoardReducer = (state = getInitialState(), action) => {
  switch (action && action.type) {
  case MODULE_ON_CHANGE:
    let modules = '';
    if (action.name === 'newModules') {
      modules = state.newModules.slice();
    } else {
      modules = state.oldModules.slice();
    }
    modules.forEach((item, i) => { if (item.code === action.code) modules[i].checked = action.checked; });

    if (action.name === 'newModules') {
      return {
        ...state,
        newModules: modules,
        modulesInvalid: invalid(state),
      };
    }
    return {
      ...state,
      oldModules: modules,
      modulesInvalid: invalid(state),
    };
  case CHECK_CLASH_SUCCESS:
    if (action.result[0]) {
      return {
        ...state,
        firstClash: true,
        checkClash: true,
        checkClashLoading: false,
        newTimetable: action.result[1],
      };
    }
    return {
      ...state,
      checkClash: false,
      checkClashLoading: false,
    };
  case SPEC_SUCCESS:
    for (const obj of action.specialisation) {
      obj.checked = false;
    }
    return {
      ...state,
      specialisation: action.specialisation,
    };
  case GET_MODULE_TIMETABLE_SUCCESS:
    return {
      ...state,
      moduleTimetables: action.timetables,
    };
  case GET_USERID_REQUEST:
    return {
      ...state,
      loading: true,
    };
  case CHECK_CLASH_REQUEST:
    return {
      ...state,
      checkClashLoading: true,
    };
  case AMEDNMENT_SUCCESS:
  case GET_MODULES_SUCCESS:
    mod(action);
    return {
      ...state,
      firstClash: false,
      checkClash: false,
      checkClashLoading: false,
      oldModules: action.modules[0],
      newModules: action.modules[1],
      loading: false,
    };
  case CHECK_CLASH_FAIL:
    return {
      ...state,
      loading: false,
      checkClashLoading: false,
      newTimetable: [],
    };
  case AMEDNMENT_FAIL:
  case GET_MODULE_TIMETABLE_FAIL:
  case GET_MODULES_FAIL:
  case GET_USERID_FAIL:
    return {
      ...state,
      loading: false,
    };
  case GET_USERID_SUCCESS:
    return {
      ...state,
      loading: false,
      userID: action.userID
    };
  default:
    return state;
  }
};

export default dashBoardReducer;
