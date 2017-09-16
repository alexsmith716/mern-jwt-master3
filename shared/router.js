

import React from 'react';
import ReactDOM from 'react-dom/server';
import helmet from 'react-helmet';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StaticRouter as Router, matchPath } from 'react-router';

import passport from 'passport';
import AuthenticationRouter from './authentication.router';
import passportService from './passport';
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {

  console.log('>>> router.js <<< in app');

  app.get('/', function (req, res) {
  // app.get('/', requireAuth, function(req, res) {
    // res.send({ message: 'Super secret code is ABC123' });
    res.sendFile(res.locals.publicViews + '/index.html');
  });

  app.use(AuthenticationRouter);

}
