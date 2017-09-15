
const AuthenticationRouter = require('express').Router();

const AuthenticationController = require('./authentication.controller');

const passport = require('passport');
const passportService = require('./passport');
const requireSignin = passport.authenticate('local', { session: false });

console.log('>>> authentication.router.js <<< loaded');

// Layer path: '/'
AuthenticationRouter.post('/signin', requireSignin, AuthenticationController.signin);

AuthenticationRouter.post('/signup', AuthenticationController.signup);

module.exports = AuthenticationRouter;
