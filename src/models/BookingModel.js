const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
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
     pet: {
		type: mongoose.Types.ObjectId,
		ref: 'Pet'
	},
     roomType: {
		type: mongoose.Types.ObjectId,
		ref: 'Room'
	}
});

BookingSchema.pre(
     'save',
     async function (next) {
          console.log("About to save booking model to PawtelDB");
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
}

*/