const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
 	username: {
 		type: String,
 		required: true,
 		unique: true
 	},
 	password: {
 		type: String,
 		required: true,
 		unique: false
 	},
     name: {
          type: String,
          required: true,
          unique: false
     },
     address: {
          type: String,
          required: true,
          unique: true
     },
     phoneNumber: {
          type: String,
          required: true,
          unique: true
     },
     email: {
          type: String,
          required: true,
          unique: true
     },
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

const User = mongoose.model(`User`, {
     name: String,
     address: String, 
     phoneNumber: Text,
     email: String,
     username: String,
     password: String,
*/