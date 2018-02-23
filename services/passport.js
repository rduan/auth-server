const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user')

const config = require('../config')

//setup options for JWT strategy
const jwtOption = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

//create jwt strategy
const jwtLogin = new JwtStrategy(jwtOption, function(payload, done) {

  // check if the user id in the payload exists in db
  User.findById(payload.sub, function(err, user) {
    if(err) { return done(err, false)}

    if(user) {
      done(null, user)
    } else {
      done(null, false);
    }
  })
});




//tell passport to use the strategy
passport.use(jwtLogin);


