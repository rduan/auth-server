const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


//define model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

//on save hook, encrypt password
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if(err) { return next(err)}

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {return next(err)}
      console.log("generated salt hash: ", hash)
      user.password = hash;
      next();
    })
  })
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);

    callback(null, isMatch);
    
  })
}

//create model class
const ModelClass = mongoose.model('user', userSchema);


// export model

module.exports = ModelClass;