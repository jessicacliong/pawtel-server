const express = require('express');
const router = express.Router();

const {
	getBookings,
	getBooking,
	makeBooking,
	changeBooking,
	removeBooking,
} = require('./src/controllers/bookings_controller');

// Read all bookings
router.get('/', getBookings);

// Read booking with :id

// Authenticate user

// Make a booking

// Update booking

// Delete booking

module.exports = router;