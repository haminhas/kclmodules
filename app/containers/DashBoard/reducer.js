import {
  GET_USERID_REQUEST,
  GET_USERID_SUCCESS,
  GET_USERID_FAIL,
  GET_MODULES_SUCCESS,
  GET_MODULES_FAIL,
  GET_MODULE_TIMETABLE_SUCCESS,
  GET_MODULE_TIMETABLE_FAIL,
  SPEC_ON_CHANGE,
  SPEC_SUCCESS,
  EXPANDED_ON_CHANGE,
} from './actions';

import {
  MODULE_ON_CHANGE,
  CHECK_CLASH_REQUEST,
  CHECK_CLASH_FAIL,
  CLASH_SUCCESS,
  CLASH_FAIL
} from 'app/containers/ModuleListForm/actions';

import {
  AMEDNMENT_SUCCESS,
  AMEDNMENT_FAIL,
} from 'app/containers/TimetableGrid/actions';

const getInitialState = () => ({
  userID: '',
  loading: true,
  firstClash: false,
  checkClash: false,
  checkClashLoading: false,
  modulesInvalid: true,
  expanded: false,
});

const invalid = (state) => {
  const newM = state.newModules.filter((x) => x.checked);
  const old = state.oldModules.filter((x) => x.checked);
  if (newM.length === old.length && newM.length > 0 && old.length > 0) {
    return false;
  }
  return true;
};

const loop = (arr) => {
  for (const obj of arr) {
    obj.checked = false;
  }
};

const mod = (action) => {
  for (let i = 0; i < action.modules[0].length; i++) {
    action.modules[1] = action.modules[1].filter((x) =>
      x.code !== action.modules[0][i].code
    );
  }
  loop(action.modules[0]);
  loop(action.modules[1]);
};

const filterSpec = (currentModules, filterModules, negate = false) => {
  const modules = new Set();
  currentModules.map((x) => {
    filterModules.map((item) => {
      if (!negate && item.modulecode === x.code) modules.add(x);
      if (negate && item.modulecode !== x.code) modules.add(x);
    });
  });
  return [...modules];
};

const dashBoardReducer = (state = getInitialState(), action) => {
  switch (action && action.type) {
  case EXPANDED_ON_CHANGE:
    return {
      ...state,
      expanded: action.expanded,
    };
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
  case SPEC_ON_CHANGE:
    const newSpec = state.specialisation.slice();
    state.oldModules = state.oldOriginal.slice();
    state.newModules = state.newOriginal.slice();
    if (action.id === '') {
      return {
        ...state,
        specialisation: newSpec,
        oldModules: state.oldOriginal.slice(),
        newModules: state.newOriginal.slice(),
      };
    }

    const specModules = state.specModules.filter((x) => x.specid === Number(action.id));
    console.log(specModules);
    const newModules = filterSpec(state.newModules, specModules);
    const oldModules = filterSpec(state.oldModules, specModules, true);
    return {
      ...state,
      specialisation: newSpec,
      oldModules: oldModules,
      newModules: newModules,
      oldOriginal: state.oldModules.slice(),
      newOriginal: state.newModules.slice(),
    };

  case CLASH_SUCCESS:
    return {
      ...state,
      firstClash: true,
      checkClash: true,
      checkClashLoading: false,
      newTimetable: action.result[1],
    };
  case CLASH_FAIL:
    return {
      ...state,
      checkClash: false,
      checkClashLoading: false,
    };
  case SPEC_SUCCESS:
    loop(action.specialisation[0]);
    return {
      ...state,
      specialisation: action.specialisation[0],
      specModules: action.specialisation[1],
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
      oldOriginal: action.modules[0],
      newOriginal: action.modules[1],
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
