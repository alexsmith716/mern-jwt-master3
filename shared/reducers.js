
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authentication.reducer';

console.log('>>>> client > reducers.js <<<< loaded');

const rootReducer = combineReducers({
  form,
  auth,
});

export default rootReducer;
