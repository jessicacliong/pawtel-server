// Import Express Library
const express = require('express');
const jwt = require('jsonwebtoken');

const { Pet } = require('../models/PetModel');

const router = express.Router()

const { 
     errorHandler,
     verifyJwtHeader, 
} = require('../middleware/checkMiddleware');



const {
     getOnePet,
     getAllPets,
     createNewPet,
     updatePetDetails,
     deletePetDetails,
     filterUndefinedProperties
} = require('../functions/PetFunctions');

const { 
     filterUndefinedProperty 
} = require('../functions/UserFunctions');

router.get('/',
    //  verifyJwtHeader,
     async (request, response) => {
          let result = await getAllPets();
          response.json({
               result
          });
});

router.get('/:petId',
    //  verifyJwtHeader,
async (request, response, next) => {
     try {
          const pet = await getOnePet({_id: request.params.petId});
          if (!pet) {
            return response.status(404).json({message: 'Pet not found'});
          }
          return response.json(pet);
        } catch (error) {
          next(error);
        }
      }
);

router.post('/',
// verifyJwtHeader,
errorHandler,
async (request, response) => {
     try {
          const petDetails = {
               name: request.body.name,
               animalType: request.body.animalType,
               breed: request.body.breed, 
               colour: request.body.colour,
               gender: request.body.gender,
               age: request.body.age,
               favouriteToy: request.body.favouriteToys,
               dietaryRequirement: request.body.dietaryRequirements,
               allergy: request.body.allergies,
               userId: request.body.userId
          };

          let newPet = await createNewPet(petDetails);
               
          response.json({
               newPet
          });
          } catch(error) {
               next(error);
          }
     }
);

router.put('/:petId',
// verifyJwtHeader,
errorHandler,
async (request, response, next) => {
     try {

          const pet = await getOnePet({_id: request.params.petId});
          if (!pet) {
            return response.status(404).json({message: 'Pet not found'});
          }

          const {
               name,
               animalType,
               breed,
               colour,
               gender,
               age,
               favouriteToys,
               dietaryRequirements,
               allergies,
               userId,
          } = request.body;

          const petDetails = {
               petId: request.params.petId,
               updatedData: filterUndefinedProperties({
                    name,
                    animalType,
                    breed,
                    colour,
                    gender,
                    age,
                    favouriteToys,
                    dietaryRequirements,
                    allergies,
                    userId,
               }),
          };
          
          const updatedPet = await updatePetDetails(petDetails);

          return response.json(updatedPet);
     } catch (error) {
          next (error);
     }
});

router.delete('/:petId', 
// verifyJwtHeader,
errorHandler,
async (request, response, next) => {
     try {
          const petId = request.params.petId;

          const deletePet = await deletePetDetails(petId);

          return response.json('Pet successfully deleted.');
     } catch (error) {
          next (error);
     }
});

module.exports = router;