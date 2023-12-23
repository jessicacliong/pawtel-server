const { Room } = require("./models/RoomModel")


async function getAllRooms() {
     let allRooms = await Room.find({});
     return Room
}

module.exports = {
     getAllRooms
}