/* utils */
import { genCalDays } from '../../utils/dateUtils';
/* actions */
import * as actions from './actions';

// current selected day reducer
const selDayState = {};

const selDay = (state = selDayState, action) => {
  switch (action.type) {
    case actions.SET_SEL_DAY:
      return action.selDay;
    case actions.SET_INIT_SEL_DAY: {
      const date = new Date();
      const gen = genCalDays(date.getMonth(), date.getFullYear());
      return gen.initDay;
    }
    case actions.SET_SEL_SPEC_DAY:
      return {
        ...state,
        day: action.specDay,
      };
    case actions.SET_SEL_MONTH:
      return {
        ...state,
        month: action.selMonth,
      };
    case actions.SET_SEL_YEAR:
      return {
        ...state,
        year: action.selYear,
      };
    default:
      return state;
  }
};

// current selected day reducer
const calDaysInit = {
  data: false,
  change: null,
  today: null,
  mainMonth: null,
  mainYear: null,
};

const calDays = (state = calDaysInit, action) => {
  if (action.type === actions.SET_CAL_DAYS) {
    return {
      today: action.items.today || state.today,
      data: action.items.calDays,
      // so we use this to check for changes in generated calendar days
      // we use a randomly generated string instead of checking actual
      // changes in array for performance obviously
      change: Math.random().toString(36).substr(2, 22),
      mainMonth: action.items.mainMonth,
      mainYear: action.items.mainYear,
    };
  } else if (action.type === actions.SET_INIT_CAL_DAYS) {
    const date = new Date();
    const gen = genCalDays(date.getMonth(), date.getFullYear());
    return {
      today: gen.initToday,
      data: gen.items,
      // so we use this to check for changes in generated calendar days
      // we use a randomly generated string instead of checking actual
      // changes in array for performance obviously
      change: Math.random().toString(36).substr(2, 22),
      mainMonth: date.getMonth(),
      mainYear: date.getFullYear(),
    };
  }
  return state;
};

export default {
  selDay,
  calDays,
};
