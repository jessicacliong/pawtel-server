const { Room } = require("../models/RoomModel")

const dotenv = require('dotenv');
dotenv.config();

// --------------------------------------
 // ----- MongoDB/MongooseJS functionality

// Returns an array of all rooms registered in database
async function getAllRooms() {
     return allRooms = await Room.find({});
}

// Returns a room based on roomId number
async function getARoom(roomId) {
     return await Room.findOne({_id: roomId});
}

// Create new room
async function createNewRoom(roomDetails) {
     let newRoom = new Room({
          roomType: roomDetails.roomType,
          pricePerNight: roomDetails.pricePerNight,
     });
 
   // And save it to DB
   return await newRoom.save();
}

// Update room details
async function updateRoomDetails(roomDetails) {
     try {
     return await Room.findByIdAndUpdate(
          roomDetails.roomId,
          roomDetails.updatedData,
          { new: true }
     ).exec();
     } catch (error) {
     throw new Error(`Error updating room: ${error.message}`);
}
};

// Delete a room
async function deleteRoomDetails(roomId) {
     return await Room.findByIdAndDelete(roomId).exec();
}

function filterUndefinedProperties(obj) {
     return Object.fromEntries(
       Object.entries(obj).filter(([_, v]) => v !== undefined)
     );
}

module.exports = {
     getAllRooms,
     getARoom,
     createNewRoom,
     updateRoomDetails,
     deleteRoomDetails,
     filterUndefinedProperties
}