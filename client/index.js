
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import history from '../shared/history';
import App from '../shared/App';
import Header from '../shared/Header';
import Signin from '../shared/Signin';
import Signup from '../shared/Signup';
import Signout from '../shared/Signout';
import Feature from '../shared/Feature';
import RequireAuth from '../shared/RequireAuth';
import reducers from '../shared/reducers';
import { AUTH_USER } from '../shared/authentication.types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

console.log('>>>> client > INDEX.js <<<< loaded');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Header />
        <div className="container">
          <App />
        </div>
      </div>
    </Router>
  </Provider>
  , document.getElementById('root'));











































