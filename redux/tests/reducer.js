/* actions */
import * as actions from './actions';

const initTestMainTimeId = false;

const testMainTimeId = (state = initTestMainTimeId, action) => {
  if (action.type === actions.SET_MAIN_TIME_ID) {
    return action.mainTimeId;
  }
  return state;
};

export default {
  testMainTimeId,
};
