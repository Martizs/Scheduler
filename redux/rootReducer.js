/* base */
import { combineReducers } from 'redux';
/* reducers */
import genReducers from './general/reducer';
import dateReducers from './dates/reducer';
import testReducers from './tests/reducer';

export default combineReducers({
  ...genReducers,
  ...dateReducers,
  ...testReducers,
});
