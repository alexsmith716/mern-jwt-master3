
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { Router } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import history from './history';
import App from './App';
import reducers from './reducers';
import { AUTH_USER } from './authentication.types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// entire state of app is stored in an object tree inside a single *store*
// To change the state tree, emit an *action* (an object describing what happened) 
// *reducers* specify HOW the *action* transform the state tree
// state can be: a primitive, an array, an object or an Immutable.js data structure
// return a new object if the state changes, do not mutate state object 

// actions dispatched upon store
// store methods: 
// redux: implements hot reloading
// time travel debugger: https://github.com/gaearon/redux-devtools

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











































