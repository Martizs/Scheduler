/* currScreen */

export const SWITCH_SCREEN = 'SWITCH_SCREEN';
// when backing title should be null
// #bestPractice
export function switchScreen(key, back, title, extraInfo) {
  return {
    type: SWITCH_SCREEN,
    items: { key, back, title, extraInfo },
  };
}

export const SET_SCREEN = 'SET_SCREEN';
// when backing title should be null
// #bestPractice
export function setScreen(key) {
  return {
    type: SET_SCREEN,
    key,
  };
}

export const ADD_EXTRA_INFO = 'ADD_EXTRA_INFO';
export function addExtraInfo(key, extraInfo) {
  return { type: ADD_EXTRA_INFO, data: { key, extraInfo } };
}

export const CLEAR_EXTRA_INFO = 'CLEAR_EXTRA_INFO';
export function clearExtraInfo(key) {
  return { type: CLEAR_EXTRA_INFO, key };
}

export const SET_FLOAT_FUNC = 'SET_FLOAT_FUNC';
export function setFloatFunc(func) {
  return { type: SET_FLOAT_FUNC, func };
}

/* screenOrient */

export const VIEW_CHANGED = 'VIEW_CHANGED';
export function viewChanged(event) {
  return { type: VIEW_CHANGED, event };
}

/* currBackActs */

export const ADD_BACK_ACTION = 'ADD_BACK_ACTION';
export function addBackAction(key, action) {
  return { type: ADD_BACK_ACTION, backItem: { key, action } };
}

export const REMOVE_BACK_ACTIONS = 'REMOVE_BACK_ACTIONS';
export function remBackAction(key) {
  return { type: REMOVE_BACK_ACTIONS, key };
}

/* loadingScreen */

export const TOGGLE_LOADING = 'TOGGLE_LOADING';

export function toggleLoading(loading) {
  return { type: TOGGLE_LOADING, loading };
}

/* modal */

export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export function toggleModal(title, content, actions) {
  return { type: TOGGLE_MODAL, modal: { title, content, actions } };
}

/* settings */

export const UPDATE_SORT = 'UPDATE_SORT';

export function updatePropSort(defSort) {
  return { type: UPDATE_SORT, defSort };
}

export const UPDATE_HOME = 'UPDATE_HOME';

export function updateHome(homePage) {
  return { type: UPDATE_HOME, homePage };
}

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

export function updateSettings(defSort, homePage) {
  return { type: UPDATE_SETTINGS, settings: { defSort, homePage } };
}

/* appDD */

export const TOGGLE_APP_DROPDOWN = 'TOGGLE_APP_DROPDOWN';

export function toggleAppDD(
  dropDown,
  onItemPress,
  tapOut,
  custInContainer,
  inputX,
  inputY
) {
  return {
    type: TOGGLE_APP_DROPDOWN,
    ddData: {
      dropDown,
      onItemPress,
      tapOut,
      custInContainer,
      inputX,
      inputY,
    },
  };
}

export const SET_APP_DROPDOWN = 'SET_APP_DROPDOWN';

export function setAppDD(dropDown) {
  return {
    type: SET_APP_DROPDOWN,
    dropDown,
  };
}

export const SET_XY_DROPDOWN = 'SET_XY_DROPDOWN';

export function setXYDD(inputX, inputY) {
  return {
    type: SET_XY_DROPDOWN,
    data: { inputX, inputY },
  };
}

export const SET_APP_REQ_CODE = 'SET_APP_REQ_CODE';

export function setAppRngCode(appRngCode) {
  return {
    type: SET_APP_REQ_CODE,
    appRngCode,
  };
}

export const SET_INIT_ITEM_ID = 'SET_INIT_ITEM_ID';

export function setInitItemId(mainTimeId) {
  return {
    type: SET_INIT_ITEM_ID,
    mainTimeId,
  };
}

export const SET_INIT_DATE = 'SET_INIT_DATE';

// @date - an object like { year, month, day }
export function setInitDate(date) {
  return {
    type: SET_INIT_DATE,
    date,
  };
}
