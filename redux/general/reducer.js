/* actions */
import * as actions from './actions';
/* consts */
import { screenTitles } from '../../consts/generalConsts';
import { sortItems } from '../../components/DayTaskList/const';
/* utils */
import findIndex from 'lodash/findIndex';
import findLastIndex from 'lodash/findLastIndex';

// current screen reducer
const currScState = {
  screenKey: 'empty',
  floatFunc: null,
  navRoute: [{ key: 'empty', extraInfo: {}, title: '' }],
  // current route index
  routeInd: 0,
};

export const currScreen = (state = currScState, action) => {
  switch (action.type) {
    case actions.SWITCH_SCREEN: {
      let screenKey = action.items.key;
      const navRoute = state.navRoute;

      if (action.items.back) {
        navRoute.pop();
        screenKey = navRoute[navRoute.length - 1].key;
      } else if (navRoute[navRoute.length - 1].key !== screenKey) {
        navRoute.push({
          key: screenKey,
          title:
            screenTitles[screenKey] === 'var'
              ? action.items.title
              : screenTitles[screenKey],
          extraInfo: action.items.extraInfo || {},
        });
      }

      return {
        screenKey,
        navRoute,
        floatAction: null,
        routeInd: navRoute.length - 1,
      };
    }
    case actions.ADD_EXTRA_INFO: {
      const navRoute = state.navRoute;
      const routInd = findLastIndex(navRoute, ['key', action.data.key]);
      if (routInd !== -1) {
        navRoute[routInd].extraInfo = {
          ...navRoute[routInd].extraInfo,
          ...action.data.extraInfo,
        };
      }
      return {
        ...state,
        navRoute,
      };
    }
    case actions.CLEAR_EXTRA_INFO: {
      const navRoute = state.navRoute;
      const routInd = findLastIndex(navRoute, ['key', action.key]);
      if (routInd !== -1) {
        navRoute[routInd].extraInfo = {};
      }
      return {
        ...state,
        navRoute,
      };
    }
    case actions.SET_FLOAT_FUNC:
      return {
        ...state,
        floatFunc: action.func,
      };
    case actions.SET_SCREEN:
      return {
        screenKey: action.key,
        floatFunc: null,
        navRoute: [
          { key: action.key, extraInfo: {}, title: screenTitles[action.key] },
        ],
        // current route index
        routeInd: 0,
      };
    default:
      return state;
  }
};

// screen orientation reducer
const screenOrState = {
  eventChange: {
    window: null,
  },
};

const screenOrient = (state = screenOrState, action) => {
  switch (action.type) {
    case actions.VIEW_CHANGED: {
      return {
        eventChange: action.event,
      };
    }
    default:
      return state;
  }
};

// current back actions reducer
const currBackState = {
  backActions: [],
};

const currBackActs = (state = currBackState, action) => {
  switch (action.type) {
    case actions.ADD_BACK_ACTION: {
      const backActions = state.backActions;
      backActions.unshift(action.backItem);
      return {
        backActions,
      };
    }
    case actions.REMOVE_BACK_ACTIONS: {
      const backActions = state.backActions;
      const remBackInd = findIndex(state.backActions, ['key', action.key]);
      if (remBackInd !== -1) {
        backActions.splice(remBackInd, 1);
      }
      return {
        backActions,
      };
    }
    default:
      return state;
  }
};

// loading reducer
const loadingState = {
  loading: false,
};

const loadingScreen = (state = loadingState, action) => {
  switch (action.type) {
    case actions.TOGGLE_LOADING: {
      return {
        loading: action.loading,
      };
    }
    default:
      return state;
  }
};

// modal reducer

const modState = {
  // modal vars
  modTitle: '',
  modContent: false,
  // array of items where each items contains a function
  // and a button title
  modActions: [],
};

const modal = (state = modState, action) => {
  switch (action.type) {
    case actions.TOGGLE_MODAL: {
      return {
        modTitle: action.modal.title,
        modContent: action.modal.content,
        modActions: action.modal.actions,
      };
    }
    default:
      return state;
  }
};

// settings
const settingsState = {
  defSort: sortItems[0].key,
  homePage: false,
};

const settings = (state = settingsState, action) => {
  switch (action.type) {
    case actions.UPDATE_SORT: {
      return {
        ...state,
        defSort: action.defSort,
      };
    }
    case actions.UPDATE_HOME: {
      return {
        ...state,
        homePage: action.homePage,
      };
    }
    case actions.UPDATE_SETTINGS: {
      return {
        defSort: action.settings.defSort,
        homePage: action.settings.homePage,
      };
    }
    default:
      return state;
  }
};

// APP dropdown reducer

const appDDState = {
  ddData: false,
};

const appDD = (state = appDDState, action) => {
  switch (action.type) {
    case actions.TOGGLE_APP_DROPDOWN: {
      if (action.ddData.dropDown) {
        return {
          ddData: {
            dropDown: action.ddData.dropDown,
            onItemPress: action.ddData.onItemPress,
            tapOut: action.ddData.tapOut,
            custInContainer: action.ddData.custInContainer,
            inputX: action.ddData.inputX,
            inputY: action.ddData.inputY,
          },
        };
      }
      return {
        ddData: false,
      };
    }
    case actions.SET_APP_DROPDOWN: {
      return {
        ddData: {
          ...state.ddData,
          dropDown: action.dropDown,
        },
      };
    }
    case actions.SET_XY_DROPDOWN: {
      return {
        ddData: {
          ...state.ddData,
          inputX: action.data.inputX,
          inputY: action.data.inputY,
        },
      };
    }
    default:
      return state;
  }
};

// alarm
const appRngCodeState = null;

const appRngCode = (state = appRngCodeState, action) => {
  switch (action.type) {
    case actions.SET_APP_REQ_CODE: {
      return action.appRngCode;
    }
    default:
      return state;
  }
};

// show in app
const initItemIdState = null;

const initItemId = (state = initItemIdState, action) => {
  switch (action.type) {
    case actions.SET_INIT_ITEM_ID: {
      return action.mainTimeId;
    }
    default:
      return state;
  }
};

const initDateState = null;

const initDate = (state = initDateState, action) => {
  switch (action.type) {
    case actions.SET_INIT_DATE: {
      return action.date;
    }
    default:
      return state;
  }
};

export default {
  loadingScreen,
  currScreen,
  screenOrient,
  currBackActs,
  modal,
  settings,
  appDD,
  appRngCode,
  initItemId,
  initDate,
};
