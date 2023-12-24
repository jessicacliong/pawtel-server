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
     deleteRoomDetails
} = require('../functions/RoomsFunctions');

// GET all rooms
router.get('/', 
     async (request, response) => {});

// GET room by roomid
router.get('/', 
     async (request, response) => {});

// Create a new room
router.post('/',
	async (request, response, next) => {});

// Update room details
router.put('/',
	async (request, response, next) => {});

//Delete room
router.delete('/',
	async (request, response, next) => {});