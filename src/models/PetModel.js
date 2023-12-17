const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PetSchema = new Schema({
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
	colour: {
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
     favouriteToys: {
          type: [String],
          required: false,
          unique: false
     },
     dietaryRequirements: {
          type: [String],
          required: false,
          unique: false
     },
     allergies: {
          type: [String],
          required: false,
          unique: false
     }
});

PetSchema.pre(
     'save',
     async function (next) {
          console.log("About to save a pet to PawtelDB");
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