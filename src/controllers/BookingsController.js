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
	filterUndefinedProperties,
     validateRoomBookedByPet,
     validateUserPermission
} = require('../functions/BookingsFunctions');

const { getUserIdFromJwt } = require('../functions/UserFunctions');
const { verifyJWTHeader } = require('../middleware/checkMiddleware');

//Authenticate user for all routes

// GET all bookings
router.get(
	'/', 
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
	async (request, response, next) => {
	// const requestingUserId = await getUserIdFromJwt(request.headers.jwt);
	try {	
		const booking = await getABooking({_id: request.params.bookingId});

		if (!booking) {
			return response.status(404).json({message: 'Booking not found'});
		}

	// 	if (!validateUserPermission(booking, requestingUserId)) {
	// 		return response.status(403).json({
	// 		error: 'Forbidden',
	// 		message: 'You do not have permission to update this booking',
	// 		});
	// 	}
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
	async (request, response, next) => {
	// const requestingUserId = await getUserIdFromJwt(request.headers.jwt);
 
	// try {
		const booking = await getABooking(request.params.bookingId);

		if (!booking) {
		return response.status(404).json({message: 'Booking not found'});
		}
 
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

