const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
     firstName: {
          type: String,
          required: true,
          unique: false
     },
     lastName: {
          type: String,
          required: true,
          unique: false
     },
     email: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          lowercase: true, 
          match: [/.+\@.+\..+/, 'Please fill a valid email address'], 
     },
     username: {
          type: String,
          required: true,
          unique: true,
          minLength: [8, 'Password should be at least 8 characters long'],
     },
     password: {
          type: String,
          required: true,
          unique: false,
     },
     pet: {
          type: mongoose.Types.ObjectId,
		ref: 'User'
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
     email: String,
     username: String,
     password: String
*/