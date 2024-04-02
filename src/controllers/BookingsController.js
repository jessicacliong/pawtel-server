// Import Express Library
const express = require('express');
const jwt = require('jsonwebtoken');

const { Booking } = require('../models/BookingModel');

const router = express.Router();

const {
	getAllBookings,
     getABooking,
     createBooking,
     updateBooking,
     deleteBooking,
	filterUndefinedProperties
} = require('../functions/BookingsFunctions');

const { verifyJwtHeader } = require('../middleware/checkMiddleware');
const { filterRolesMiddleware, filterPetsMiddleware, filterBookingsMiddleware } = require('../middleware/filteringMiddleware');
const { verifyJwtRole } = require('../functions/UserFunctions');

//Authenticate user for all routes

// GET all bookings
router.get(
	'/', 
	verifyJwtHeader,
	verifyJwtRole,
     filterRolesMiddleware,
		async (request, response) => {
			let allBookings = await getAllBookings();

			response.json({
				bookingCount: allBookings.length,
				bookings: allBookings
		});
	});


// GET booking with :id
router.get(
	'/:bookingId',
     verifyJwtHeader,
     verifyJwtRole,
     filterBookingsMiddleware,
		async (request, response, next) => {
			try {
				const booking = await getABooking({_id: request.params.bookingId});
				if (!booking) {
					return response.status(404).json({message: 'Booking not found'});
				}
				return response.json(booking);
			} catch (error) {
				response
					.status(400)
					.json({error: error.message});
			next(error);
			}
		}
	);

	
// Create a booking
router.post('/',
	verifyJwtHeader,
	verifyJwtRole,
	filterBookingsMiddleware,
	async (request, response, next) => {
		try {
			const bookingDetails = {
				roomType: request.body.roomType,
				startDate: request.body.startDate,
				endDate: request.body.endDate,
				petId: request.body.petId
			};

			let newBookingDoc = await createBooking(bookingDetails);
			
			response.json({
				newBookingDoc
			});
		} catch(error) {
			next(error);
		}
	}
);

// Update a certain booking
router.put('/:bookingId',
	verifyJwtHeader,
	verifyJwtRole,
	filterBookingsMiddleware,
	async (request, response, next) => {
	try {	
		const booking = await getABooking({_id: request.params.bookingId});

		if (!booking) {
			return response.status(404).json({message: 'Booking not found'});
		}

		const {
			roomType,
			startTime,
			endTime,
			petId
		   } = request.body;

		   const bookingDetails = {
			bookingId: request.params.bookingId,
			updatedData: filterUndefinedProperties({
				roomType,
				startTime,
				endTime,
				petId
			}),
		   };

		const updatedBooking = await updateBooking(bookingDetails);
	
		return response.json(updatedBooking);
		} catch (error) {
			next(error);
	}
});
	
// Delete a booking
router.delete("/:bookingId",
	verifyJwtHeader,
	verifyJwtRole,
	filterBookingsMiddleware,
	async (request, response, next) => {
	try {
		const booking = await getABooking(request.params.bookingId);

		if (!booking) {
		return response.status(404).json({message: 'Booking not found'});
		}

		const deletedBooking = await deleteBooking(request.params.bookingId);
		return response.json({
			message: 'Booking deleted successfully',
			booking: deletedBooking,
		});
	} catch (error) {
	next(error);
	}
});

module.exports = router;

