const { Room } = require("./models/RoomModel")


async function getAllRooms() {
     let allRooms = await Room.find({});
     return allRooms
}

async function getARoom() {
     return await Booking.findOne();
}

// Create new room
async function createNewRoom(roomDetails) {
     let newRoom = new Room({
          roomType: roomDetails.roomType,
     });
 
   // And save it to DB
   return await newRoom.save();
}

// Update pet details
async function updateRoomDetails(roomDetails) {
     try {
     return await Room.findByIdAndUpdate(
          roomDetails.roomId,
          updatedData,
          { new: true }
     ).exec();
     } catch (error) {
     throw new Error(`Error updating room: ${error.message}`);
}
};

// Delete a pet
async function deleteRoomDetails(roomId) {
     return await Room.findByIdAndDelete(roomId).exec();
}
module.exports = {
     getAllRooms,
     getARoom,
     createNewRoom,
     updateRoomDetails,
     deleteRoomDetails
}