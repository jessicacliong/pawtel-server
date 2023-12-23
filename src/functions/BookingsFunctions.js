const { Booking } = require('../models/BookingModel');

// Get All Bookings
async function getAllBookings() {
	return await Booking.find({}).exec()
}

// Get A booking by booking ID
async function getABooking(bookingId) {
     return await Booking.findOne({_id: bookingId});
   }

// POST create a new booking
async function makeBooking(bookingDetails) {
const { startDate, endDate } = bookingDetails;

// Check if startDate is after endDate
if (new Date(startDate) > new Date(endDate)) {
     throw new Error('Start date cannot be after end date.');
}

// create a new booking
let newBooking = new Booking({
     start_time: bookingDetails.startDate,
     end_time: bookingDetails.endDate,
     pet: bookingDetials.pet_id
});

return await newBooking.save();
}


// Update booking, return the updated booking data.

async function changeBooking(bookingDetails) {
     try {
       const existingBooking = await Booking.findById(bookingDetails.bookingId).exec();
   
       if (!existingBooking) {
         throw new Error('Booking not found.');
       }
   
       const updatedData = bookingDetails.updatedData || {};
       const { startDate, endDate } = updatedData;
   
       // Check if startDate is after endDate
       if (new Date(startDate) > new Date(endDate)) {
         throw new Error('Start date cannot be after end date.');
       }
   
       // Check for overlapping bookings
       if (startDate || endDate) {
         const { room_id } = existingBooking;
   
         // Check if there is an overlapping booking for the specified room and time range
         const overlappingBooking = await Booking.findOne({
           _id: { $ne: bookingDetails.bookingId }, // Exclude the current booking from the check
           room_id: room_id,
           $or: [
             { startDate: { $lt: endDate }, endDate: { $gt: startDate } }, // New booking starts before existing ends
             { startDate: { $lt: endDate }, endDate: { $gt: endDate } }, // New booking overlaps with existing booking
             { startDate: { $lt: startDate }, endDate: { $gt: startDate } },
           ],
         });
   
         if (overlappingBooking) {
           const errorMessage = `Overlapping booking detected for room ${room_id} between ${start_time} and ${end_time}.`;
           throw new Error(errorMessage);
         }
       }

          return await Booking.findByIdAndUpdate(
               bookingDetails.bookingId,
               updatedData,
               { new: true }
          ).exec();
          } catch (error) {
          throw new Error(`Error updating booking: ${error.message}`);
     }
}

// Deletes an existing booking
async function deleteBooking(bookingId) {
     return await Booking.findByIdAndDelete(bookingId).exec();
}

// Validates a room is currently booked by a pet
async function validateRoomBookedByPet(roomId, requestingPetId) {
     try {
       const petsRooms = await getAllRooms(requestingPetId);
       const petsRoomIds = petsRooms.map((room) => room._id.toString()); // Convert to strings for comparison
   
       if (!petsRoomIds.includes(roomId)) {
         return false;
       }
       return true;
     } catch {
       return false;
     }
   }

// Validates user permission to access a booking
   const validateUserPermission = (booking, requestingUserId) => {
     if (
       requestingUserId !== booking.primary_user_id._id.toString() &&
       !booking.invited_user_ids
         .map((id) => id.toString())
         .includes(requestingUserId)
     ) {
       return false;
     }
     return true;
   };

module.exports = {
     getAllBookings,
     getABooking,
     makeBooking,
     changeBooking,
     deleteBooking,
     validateRoomBookedByPet,
     validateUserPermission
};

