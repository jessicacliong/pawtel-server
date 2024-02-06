const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
          unique: false
     },
     animalType: {
          type: String,
          required: true,
          unique: false
     },
     breed: {
          type: String,
          required: true,
          unique: false
     },
	color: {
          type: String,
          required: true,
          unique: false
     },
     gender: {
          type: String,
          required: false,
          unique: false
     },
     age: {
          type: Number,
          required: false,
          unique: false
     },
     favouriteToy: {
          type: String,
          required: false,
          unique: false,
          default: 'None'
     },
     dietaryRequirement: {
          type: String,
          required: false,
          unique: false, 
          default: 'None'
     },
     allergy: {
          type: String,
          required: false,
          unique: false,
          default: 'None'
     },
     ownerId: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
     
});

PetSchema.pre(
     'save',
     async function (next) {
          console.log("About to save pet model to PawtelDB");
          next();
     }
)

const Pet = mongoose.model('Pet', PetSchema)

module.exports = {
     Pet
}


/*   Pet Model

const Pet = mongoose.model(`Pet`, {
     name: String,
     animalType: String,
     breed: String,
     colour: String,
     gender: String,
     age: Number,
     favouriteToys: [String],
     dietaryRequirements: [String],
     allergies: [String],
});

*/