export const LOAD_NEW_MODULES = 'LOAD_NEW_MODULES';
export const LOAD_OLD_MODULES = 'LOAD_OLD_MODULES';
export const MODULE_ON_CHANGE = 'MODULE_ON_CHANGE';

export const moduleOnChange = (name, code, checked) => ({
  type: MODULE_ON_CHANGE,
  name,
  code,
  checked
});

export const loadOldModules = modules => ({
  type: LOAD_OLD_MODULES,
  modules,
});

export const loadNewModules = modules => ({
  type: LOAD_NEW_MODULES,
  modules,
});
