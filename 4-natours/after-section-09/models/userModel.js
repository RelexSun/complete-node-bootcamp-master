const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide us your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please priovide a valid email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
        // to check weather password is match with passwordConfirm
      },
      message: 'Password are not the same'
    }
  }
});

// Pre middleware functions are executed one after another, when each middleware calls next.
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // hash is asyncronous function and hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12); // 12 is a salt parameter to encrypt the password the higher it goes the more cpu intensive will be.

  // Delete passwordConfirm field
  this.passwordConfirm = undefined; // don't have to be in a database
  next();
});

module.exports = model('User', userSchema);
