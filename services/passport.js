const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user')

const config = require('../config')

//setup options for JWT strategy
const jwtOption = {}

//create jwt strategy
const jwtLogin = new JwtStrategy(jwtOption, function(payload, done) {

  // check if the user id in the payload exists in db
});




//tell passport to use the strategy



