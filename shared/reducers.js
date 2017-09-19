
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './authentication.reducer';

console.log('>>>> client > reducers.js <<<< auth: ', auth);

const rootReducer = combineReducers({ form, auth });

console.log('>>>> client > reducers.js <<<< rootReducer: ', rootReducer);

export default rootReducer;
