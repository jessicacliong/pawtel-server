const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
     roomType: {
          type: String,
          required: true,
          unique: false
     }

});

RoomSchema.pre(
     'save',
     async function (next) {
          console.log("Saving room model to PawtelDB");
          next();
     }
)

const Room = mongoose.model('Room', RoomSchema);

module.exports = {
     Room
}