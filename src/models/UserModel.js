const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
     firstname: {
          type: String,
          required: true,
          unique: false
     },
     lastname: {
          type: String,
          required: true,
          unique: false
     },
     address: {
          type: String,
          required: true,
          unique: true
     },
     city: {
          type: String,
          required: true,
          unique: true
     },
     postcode: {
          type: Number,
          required: true,
          unique: false
     },
     email: {
          type: String,
          required: true,
          unique: true
     },
     username: {
          type: String,
          required: true,
          unique: true
     },
     password: {
          type: String,
          required: true,
          unique: false
     }
 });

UserSchema.pre(
     'save',
     async function (next) {
          console.log("About to save a user to PawtelDB!");
          next();
     }
)

const User = mongoose.model('User', UserSchema);

module.exports = {
     User
}

/* User Model

const User
     name: String,
     address: String,
     city: String,
     postcode: Number,
     email: String,
     username: String,
     password: String,
*/