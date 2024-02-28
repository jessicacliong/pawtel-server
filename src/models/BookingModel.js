const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
     roomType: {
          type: String,
          required: true,
          unique: false
     },
     startDate: {
          type: Date,
          required: true,
          unique: false
     },
     endDate: {
          type: Date,
          required: true,
          unique: false
     },
     petId: {
		type: mongoose.Types.ObjectId,
		ref: 'Pet',
	}
});

BookingSchema.pre(
     'save',
     async function (next) {
          console.log("Saving booking model to PawtelDB");
          next();
     }
)

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = {
     Booking
}

/* Booking Model

const Booking = mongoose.model(`Booking`, {
     roomType: String,
     startDate: Date,
     endDate: Date
     petId:
}

*/