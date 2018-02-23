const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp}, config.secret);
}

exports.signup = function (req, res, next) {

  const email = req.body.email;
  const password = req.body.password;

  // console.log(email, password)

  if (!email || !password) {
    return res
      .status(422)
      .send({error: 'you musht provide email and password'});
  }

  User
  .findOne({email})
  .exec()
  .then((user) => {
    console.log("user ====")
    console.log(user);
  })
  .catch((err) => {
    console.log("err ====")
    console.log(err);
  })


  //see if a user with the given email exists
  User.findOne({
    email
  }, (err, existingUser) => {
    if (err) {
      return next(err)
    }

    if (existingUser) {
      console.log('existing user: ', existingUser);
      return res
        .status(422)
        .send({error: 'email already exist'});
    }

    const user = new User({email, password})

  user
    .save()
    .then((user) => {
      res.json({token: tokenForUser(user)});
      // res.send(user)
    });

});

// if a user with email already exist, return error create user and respond that
// user was created res.send({success: 'true'}) app.get('/', (req, res, next) =>
// {   res.send(['paper','too']) });

}