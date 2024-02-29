// Import Express Library
const express = require('express');
const jwt = require('jsonwebtoken');

const { Room } = require('../models/RoomModel');

const router = express.Router();

const {
     getAllRooms,
     getARoom,
     createNewRoom,
     updateRoomDetails,
     deleteRoomDetails,
     filterUndefinedProperties
} = require('../functions/RoomsFunctions');

const { 
     errorHandler,
     verifyJwtHeader, 
} = require('../middleware/checkMiddleware');


// GET all rooms
router.get(
     '/',
     async (request, response) => {
          let result = await getAllRooms();
          response.json({
               result
          });
     }
);

// GET room by roomId
router.get(
     '/roomId', 
     async (request, response) => {
          try {
               const room = await getRoomById({_id:request.params.roomId})
               
               if (!room) {
               return response.status(404).json({message: 'Room not found'});
               }

               return response.json(room);

          } catch (error) {
               next(error);
          }
     });

// Create a new room
router.post(
     '/',
	async (request, response, next) => {
          try {
               const roomDetails = {
                    roomType: request.body.roomType,
                    pricePerNight: request.body.pricePerNight
               };
               
               let newRoom = await createNewRoom(roomDetails);

               response.json({
                    newRoom
               });
          } catch(error) {
               next(error);
          }
     });

// Update room details
router.put(
     '/roomId',
	async (request, response, next) => {
          try {

               const room = await getARoom({_id: request.params.roomId});

               if (!room) {
                    return response.status(404).json({message: 'Room not found'});
               }

               const {
                    roomType,
                    pricePerNight,
               } = request.body;

               const roomDetails = {
                    roomId: request.params.roomId,,
                    updatedData: filterUndefinedProperties({
                         roomType,
                         pricePerNight
                    }),
               };

               const updatedRoom = await updateRoomDetails(roomDetails);

               return response.json(updatedRoom);
          } catch (error) {
               next(error);
          }
     });

//Delete a room
router.delete(
     '/roomId',
	async (request, response, next) => {
          try {
               const roomId = request.params.roomId;
               
               const deleteRoom = await deleteRoomDetails(roomId);

               return response.json('Room successfully deleted.');
          } catch (error) {
               next(error);
          }
     });

module.exports = router;