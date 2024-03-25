const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
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
          unique: true
     },
     password: {
          type: String,
          required: true,
          unique: false,
          minLength: [8, 'Password should be at least 8 characters long'],
     },
     role: {
          type: mongoose.Types.ObjectId, 
          ref: 'Role',
          required: true,
          unique: false
     }
});

 // User Prehook to save user information and inclue crypting password middleware
UserSchema.pre(
     'save',
     async function (next) {
          const user = this;
          // If password wasn't changed to plaintext, skip to next function.
 	     if (!user.isModified('password')) return next();
 	     // If password was changed, assume it was changed to plaintext and hash it.
 	     const hash = await bcrypt.hash(this.password, 10);
 	     this.password = hash;
          next();
     });

// Exclude password from JSON responses
UserSchema.set('toJSON', {
     transform: (doc, ret) => {
         delete ret.password;
         return ret;
     }
 });

const User = mongoose.model('User', UserSchema);

module.exports = {
     User
}