const User = require('../models/user');

exports.signup = function(req, res, next) {

  const email = req.body.email;
  const password = req.body.password;

  console.log(email, password)

  if(!email || !password) {
    return res.status(422).send({error: 'you musht provide email and password'});
  }

  //see if a user with the given email exists
  User.findOne({email}, (err, existingUser) => {
    if(err) {return next(err)}

    if(existingUser) {
      return res.status(422).send({error: 'email already exist'});
    }

    const user = new User({
      email,
      password
    })

    user.save().then((user) => res.send(user));


  });


  //if a user with email already exist, return error


  //create user and respond that user was created


  // res.send({success: 'true'})
  // app.get('/', (req, res, next) => {
  //   res.send(['paper','too'])
  // });

}

