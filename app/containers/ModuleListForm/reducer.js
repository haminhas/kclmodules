import {
  LOAD_OLD_MODULES,
  LOAD_NEW_MODULES,
  MODULE_ON_CHANGE,
} from './actions';

const getInitialState = () => ({
  newModules: '',
  oldModules: '',
});

const ModuleListReducer = (state = getInitialState(), action) => {
  switch (action && action.type) {
  case MODULE_ON_CHANGE:

    let modules = '';
    if (action.name === 'newModules') {
      modules = state.newModules;
    } else {
      modules = state.oldModules;
    }
    modules.forEach((item, i) => { if (item.moduleCode === action.code) modules[i].checked = action.checked; });

    if (action.name === 'newModules') {
      return {
        ...state,
        newModules: modules
      };
    }
    return {
      ...state,
      oldModules: modules
    };
  case LOAD_OLD_MODULES:
    const oldModules = [];
    for (const mod of action.modules) {
      const obj = {
        moduleCode: mod.code,
        checked: false
      };
      oldModules.push(obj);
    }

    return {
      ...state,
      oldModules: oldModules,
    };
  case LOAD_NEW_MODULES:
    const newModules = [];
    for (const mod of action.modules) {
      const obj = {
        moduleCode: mod.code,
        checked: false
      };
      newModules.push(obj);
    }

    return {
      ...state,
      newModules: newModules,
    };
  default:
    return state;
  }
};

export default ModuleListReducer;
