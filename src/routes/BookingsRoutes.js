const express = require('express');

const router = express.Router();

const {
	getBookings,
	getBooking,
	makeBooking,
	changeBooking,
	removeBooking,
} = require('../controllers/BookingController');

//Authenticate user for routes

// Read all bookings
router.get("/", getBookings);

// Read booking with :id

// Authenticate user

// Make a booking

// Update booking

// Delete booking

module.exports = router;