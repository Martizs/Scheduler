import { createStore } from 'redux';

import rootReducer from './rootReducer';

const initStore = () => createStore(rootReducer, {});

module.exports = {
  initStore,
};
