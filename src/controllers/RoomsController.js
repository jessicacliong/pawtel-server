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
     verifyJwtRole
 } = require('../functions/UserFunctions');

const {
     verifyJwtHeader, 
} = require('../middleware/checkMiddleware');

const { 
     filterRolesMiddleware
} = require('../middleware/filteringMiddleware');


// GET all rooms
router.get(
     '/',
     verifyJwtHeader,
     verifyJwtRole,
     filterRolesMiddleware,
     async (request, response, next) => {
          try {
               let allRooms = await getAllRooms();
               
               response.json({
                    roomsCount: result.length, 
                    rooms: allRooms
               });

          } catch (error) {
               next(error);

     }
});

// GET room by roomId
router.get(
     '/:roomId', 
     verifyJwtHeader,
     verifyJwtRole,
     filterRolesMiddleware,
     async (request, response, next) => {
          try {
               const room = await getARoom({_id:request.params.roomId})
               
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
     '/:roomId',
     verifyJwtHeader,
     verifyJwtRole,
     filterRolesMiddleware,
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
                    roomId: request.params.roomId,
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
     '/:roomId',
     verifyJwtHeader,
     verifyJwtRole,
     filterRolesMiddleware,
	async (request, response, next) => {
          try {
               const roomId = await getARoom({_id: request.params.roomId});
               
               if (!roomId) {
                    return response.status(404).json({message: 'Room not found'});
               }

               const deleteRoom = await deleteRoomDetails(roomId);


               return response.json('Room successfully deleted.');

          } catch (error) {
               next(error);
          }
     });

module.exports = router;