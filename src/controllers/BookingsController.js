// Import Express Library
const express = require('express');
const jwt = require('jsonwebtoken');

const { Booking } = require('../models/BookingModel');

const router = express.Router();

const {
	getAllBookings,
     getABooking,
     makeBooking,
     changeBooking,
     deleteBooking,
     validateRoomBookedByPet,
     validateUserPermission
} = require('../functions/BookingsFunctions');

const { getUserIdFromJwt } = require('../functions/UserFunctions');
const { verifyJWTHeader } = require('../middleware/checkMiddleware');

//Authenticate user for all routes

// GET all bookings

// GET all bookings
router.get('/', 
async (request, response) => {
	let result = await Booking.find({});
	response.json({result});
});


// GET booking with :id
router.get('/:bookingId',
	async (request, response) => {
		try {
			const bookings = await fetchBookings({ bookingId: request.query.bookingId});
				result
				.status(200)
				.json(bookings);
		} catch (error) {
			response
				.status(400)
				.json({error: error.message});
		}
	});

// Create a booking
router.post('/',
	async (request, response, next) => {
		try {
			let newBookingDoc = await Booking.create(request.body).catch(error => error);
			response
				.status(201)
				.json({booking: newBookingDoc})
		} catch (error) {
			response
				.status(400)
				.json({error: error.message, valueGiven: error.value});
			}
	  });

// Update a certain booking
router.put('/:booking_id',
	async (request, response) => {
	const requestingUserId = await getUserIdFromJwt(request.headers.jwt);

	try {
		const booking = await getOneBooking(request.params.bookingId);

		if (!booking) {
			return response.status(404).json({message: 'Booking not found'});
		}

		if (!validateUserPermission(booking, requestingUserId)) {
			return response.status(403).json({
			error: 'Forbidden',
			message: 'You do not have permission to update this booking',
			});
		}

		const {
			start_time,
			end_time,
			pet_id
		   } = request.body;
		   const roomDetails = {
			bookingId: request.params.bookingId,
			updatedData: filterUndefinedProperties({
			  start_time,
			  end_time,
			  pet_id
			}),
		   };
		   const updatedBooking = await updateBooking(roomDetails);
	    
		   response.json(updatedBooking);
	} catch (error) {
		next(error);
	};
});
	
// Delete a booking
router.delete("/:bookingId",
	async (request, response, next) => {
	// const requestingUserId = await getUserIdFromJwt(request.headers.jwt);
 
	// try {
	//   const booking = await getOneBooking(request.params.bookingId);
 
	//   if (!booking) {
	//     return response.status(404).json({message: 'Booking not found'});
	//   }
 
	//   if (validateUserPermission(booking, requestingUserId)) {
	
	try {
	    const deletedBooking = await deleteBooking(request.params.bookingId);
	    response.json({
		 message: 'Booking deleted successfully',
		 booking: deletedBooking,
	    });
	//   } else {
	//     response.status(403).json({
	// 	 message: 'Unauthorised. You do not have permission.',
	//     });
	//   }
	} catch (error) {
	  next(error);
	}
   }
 );

module.exports = router;

