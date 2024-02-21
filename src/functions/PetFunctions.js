const { Pet } = require("../models/PetModel");


// --------------------------------------
 // ----- MongoDB/MongooseJS functionality

// Returns an array of all pets registered in database
async function getAllPets() { 
     return await Pet.find({});
}

// Returns a pet based on petId number
async function getOnePet(petId) {
     return await Pet.findOne({_id: petId});
   }

// Create new pet
async function createNewPet(petDetails) {
     let newPet = new Pet({
          name: petDetails.name,
          animalType: petDetails.animalType,
          breed: petDetails.breed,
          colour: petDetails.colour,
          gender: petDetails.gender,
          age: petDetails.Number,
          favouriteToys: petDetails.favouriteToys,
          dietaryRequirements: petDetails.dietaryRequirements,
          allergies: petDetails.allergies,
          userId: petDetails.userId
     });
 
   // And save it to DB
   return await newPet.save();
}

// Update pet details
async function updatePetDetails(petDetails) {
     try {
     return await Pet.findByIdAndUpdate(
          petDetails.petId,
          petDetails.updatedData,
          { returnDocuments: 'after' }
     ).exec();
     } catch (error) {
     throw new Error(`Error updating pet details: ${error.message}`);
}
};

// Delete a pet
async function deletePetDetails(petId) {
     return await Pet.findByIdAndDelete(petId).exec();
}



// --------------------------------------
// ----- Exports


module.exports = {
     getAllPets,
     getOnePet,
     createNewPet,
     updatePetDetails,
     deletePetDetails
}