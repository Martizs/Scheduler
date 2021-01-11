/* base */
import { combineReducers } from 'redux';
/* reducers */
import genReducers from './general/reducer';
import dateReducers from './dates/reducer';

export default combineReducers({
  ...genReducers,
  ...dateReducers,
});
