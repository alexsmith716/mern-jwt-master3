
const path = require('path')
const AuthenticationRouter = require('./authentication.router');
const passport = require('passport');
const passportService = require('./passport');
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






























/*
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user.profile);
    }
);
*/
