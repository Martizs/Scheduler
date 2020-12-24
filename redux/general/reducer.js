/* actions */
import * as actions from './actions';
/* consts */
import { HOME_TITLE, screenTitles } from '../../consts/generalConsts';
import { sortItems } from '../../components/DayTaskList/const';
/* utils */
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';

const initScState = {
  screenKey: HOME_TITLE,
  floatFunc: null,
  navRoute: [
    { key: HOME_TITLE, extraInfo: {}, title: screenTitles[HOME_TITLE] },
  ],
  // current route index
  routeInd: 0,
};

// current screen reducer
const currScState = {
  screenKey: HOME_TITLE,
  floatFunc: null,
  navRoute: [
    { key: HOME_TITLE, extraInfo: {}, title: screenTitles[HOME_TITLE] },
  ],
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
      const routInd = findIndex(navRoute, ['key', action.data.key]);
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
    case actions.SET_FLOAT_FUNC:
      return {
        ...state,
        floatFunc: action.func,
      };
    case actions.RESET_NAV_ROUTES: {
      let navRoute = state.navRoute;
      const defItem = {
        key: HOME_TITLE,
        extraInfo: {},
        title: screenTitles[HOME_TITLE],
      };
      if (navRoute[navRoute.length - 1].key === HOME_TITLE) {
        navRoute = [defItem];
      } else {
        navRoute = [defItem, navRoute[navRoute.length - 1]];
      }

      return {
        ...state,
        routeInd: navRoute.length - 1,
        navRoute,
      };
    }
    case actions.INIT_SCREEN:
      return cloneDeep(initScState);
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
};

const settings = (state = settingsState, action) => {
  switch (action.type) {
    case actions.UPDATE_SETTINGS: {
      return {
        defSort: action.defSort,
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

export default {
  loadingScreen,
  currScreen,
  screenOrient,
  currBackActs,
  modal,
  settings,
  appDD,
  appRngCode,
};
