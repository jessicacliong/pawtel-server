const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
     roomType: {
          type: String,
          required: true,
          unique: false
     }

});

RoomSchema.pre(
     'save',
     async function (next) {
          console.log("About to save room model to PawtelDB");
          next();
     }
)

const Room = mongoose.model('Room', RoomSchema);

module.exports = {
     Room
}