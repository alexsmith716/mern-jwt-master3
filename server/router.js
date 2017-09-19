
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
import Header from '../shared/Header';

// Invariant Violation Browser history needs a DOM
// You cannot use the BrowserHistory on the server. 
// For server-side rendering you have to use createLocation.
// And create a one-off location object which you can use with 'match'
//   in order to figure out what needs to be rendered on the server.

module.exports = function(app) {

  console.log('>>> router.js > in app <<<');

  app.get('*', (req, res) => {
  // app.get('/', (req, res) => {
  
    console.log('>>>> server.js <<<< app.get(*) > req.url: ', req.url)
  
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
  
    console.log('>>>> server > router.js > app.get(*) > component: ', component)


    component.fetchData({ store, params: foundPath.params }).then(() => {
  
      let preloadedState = store.getState();
      let context = {};

      console.log('>>>> server.js component.fetchData store: ', store);
      console.log('>>>> server.js component.fetchData preloadedState: ', preloadedState);
  
    
      const html = ReactDOM.renderToString(

        <Provider store={store}>
          <Router context={context} location={req.url}>
            <div>
              <Header />
              <div className="container">
                <App />
              </div>
            </div>
          </Router>
        </Provider>

      )

      const helmetData = helmet.renderStatic();

      if (context.url){
  
        console.log('>>>> server.js <<<< component.fetchData context.url 1: ', context.url);
        res.redirect(context.status, 'http://' + req.headers.host + context.url);
  
      }else if (foundPath && foundPath.path == '/404'){
  
        console.log('>>>> server.js <<<< component.fetchData foundPath 404 2: ', foundPath.path);
        res.status(404).send(renderFullPage(html, preloadedState, helmetData))
        
      }else{
  
        console.log('>>>> server.js <<<< component.fetchData renderFullPage 3: ', renderFullPage);
        res.send(renderFullPage(html, preloadedState, helmetData))
      }

    });
  });
  
  function renderFullPage(html, preloadedState, helmet) {

    console.log('>>>> server.js <<<< renderFullPage > html: ', html);
    console.log('>>>> server.js <<<< renderFullPage > preloadedState: ', preloadedState);
    console.log('>>>> server.js <<<< renderFullPage > helmet: ', helmet);

    return `
    <!doctype html>
    <html>
      <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- <link rel="icon" href="/favicon/favicon.ico" type="image/ico" /> -->

        <link href="data:image/x-icon;" type="image/x-icon" rel="shortcut icon">
        <intercept-url pattern="/favicon.ico" access="ROLE_ANONYMOUS"></intercept-url>

        <link rel="stylesheet" href="/style/style.css">
        <link rel="stylesheet" href="/vendor/bootstrap.3.3.7/css/bootstrap.min.css">

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

