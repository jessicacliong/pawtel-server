// Import Express Library
const express = require('express');
const jwt = require('jsonwebtoken');

const { Booking } = require('../models/BookingModel');

const router = express.Router();

const {
	getBookings,
	getBooking,
	makeBooking,
	changeBooking,
	removeBooking,
} = require('../functions/BookingsFunctions');

//Authenticate user for all routes

// Read all bookings
router.get('/', 
	async (request, response) => {});

// Read booking with :id
router.get('/:id',
 	async (request, response) => {});

// Make a booking
router.post('/',
	async (request, response) => {});

// Update booking
router.put('/',
	async (request, response) => {});

// Delete booking
// const removeBooking = (request, response) => {};

module.exports = router;