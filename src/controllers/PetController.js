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
     deletePetDetails
} = require('../functions/PetFunctions');

const { 
     filterUndefinedProperty 
} = require('../functions/UserFunctions');

router.get('/',
    //  verifyJwtHeader,
     async (request, response) => {
          let result = await getAllPets();
          response.json({result});
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

router.post('/:petId',
verifyJwtHeader,
errorHandler,
async (request, response) => {
     try {
          const petDetails = {
               name: request.body.name,
               animalType: request.body.animalType,
               breed: request.body.breed, 
               color: request.body.color,
               gender: request.body.gender,
               age: request.body.age,
               favouriteToy: request.body.favouriteToy,
               dietaryRequirement: request.body.dietaryRequirement,
               allergy: request.body.allergy,
          };

          let newPet = await createNewPet(petDetails);
               
          response.json({
               newPet
          });
          } catch (error) {
               next(error);
          }
     }
);

router.put('/:petId',
verifyJwtHeader,
errorHandler,
async (request, response, next) => {
     try {
          const {
               name,
               animalType,
               breed,
               color,
               gender,
               age,
               favouriteToy,
               dietaryRequirement,
               allergy,
          } = request.body;

          const petDetails = {
               petId: request.params.petId,
               updatedData: {
                    name,
                    animalType,
                    breed,
                    color,
                    gender,
                    age,
                    favouriteToy,
                    dietaryRequirement,
                    allergy,
               },
          };
          
          const updatedPet = await updatePetDetails(petDetails);

          return response.json(updatedPet);
     } catch (error) {
          next (error);
     }
});

router.delete('/:petId', 
verifyJwtHeader,
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