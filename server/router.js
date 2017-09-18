
import React from 'react';
import ReactDOM from 'react-dom/server';
import helmet from 'react-helmet';
import { render } from 'react-dom';
import express from 'express';
// import { Router } from 'express';
// const router = new Router();
const app = express();

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StaticRouter as Router, matchPath } from 'react-router';

import App from '../shared/App';
import reducers from '../shared/reducers';
import reduxThunk from 'redux-thunk';
import sharedRoutes from '../shared/routes';

// Invariant Violation Browser history needs a DOM
// You cannot use the BrowserHistory on the server. 
// For server-side rendering you have to use createLocation.
// And create a one-off location object which you can use with 'match'
//   in order to figure out what needs to be rendered on the server.

console.log('>>> router.js <<< loaded');

module.exports = function(app) {

  console.log('>>> router.js <<< in app');

  app.get('/', (req, res) => {
  
    console.log('>>>> server.js <<<< app.get(*) <<<<')
  
    const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
    const store = createStoreWithMiddleware(reducers);
    let foundPath = null;
  
    // foundPath = { path: '/', url: '/', isExact: true, params: {} }
  
    let { path, component } = sharedRoutes.routes.find(
      ({ path, exact }) => {
  
        foundPath = matchPath(req.url,
          {
            path,
            exact,
            strict: false
          }
        )
        return foundPath;
    }) || {};
  
    component.fetchData({ store, params: foundPath.params }).then(() => {
  
      let preloadedState = store.getState();
      let context = {};
  
      console.log('>>>> server.js <<<< app.get(*) <<<< component.fetchData store: ', store)
      console.log('>>>> server.js <<<< app.get(*) <<<< component.fetchData preloadedState: ', preloadedState)
  
      /*
      const html = ReactDOM.renderToString(
        <Provider store={store}>
          <Router context={context} location={req.url}>
            <App />
          </Router>
        </Provider>
      )
      
      const helmetData = helmet.renderStatic();
  
      if (context.url){
  
        res.redirect(context.status, 'http://' + req.headers.host + context.url);
  
      }else if (foundPath && foundPath.path == '/404'){
  
        res.status(404).send(renderFullPage(html, preloadedState, helmetData))
        
      }else{
  
        res.send(renderFullPage(html, preloadedState, helmetData))
      }
      */
    });
  
  });
  
  function renderFullPage(html, preloadedState, helmet) {
    return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="/favicon/favicon.ico" type="image/ico" />
        <title>MERN-JWT!!!!!</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/assets/bundle.js"></script>
      </body>
    </html>
    `
  }
  
  /*
  app.get('/', function (req, res) {
  // app.get('/', requireAuth, function(req, res) {
    // res.send({ message: 'Super secret code is ABC123' });
    res.sendFile(res.locals.publicViews + '/index.html');
  });
  
  app.use(AuthenticationRouter);
  */
}

