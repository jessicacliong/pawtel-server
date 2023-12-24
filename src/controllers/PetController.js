// Import Express Library
const express = require('express');
const jwt = require('jsonwebtoken');

const { Pet } = require('../models/PetModel');
const { errorHandler } = require('../middleware/checkMiddleware');

const router = express.Router();

const {
     getOnePet,
     getAllPets,
     createNewPet
} = require('../functions/PetFunctions')

router.get("/",
    //  verifyJwtHeader,
     async (request, response) => {
          let result = await Pet.find({});
          response.json({result});
});

router.get("/:petId",
    //  verifyJwtHeader,
async (request, response, next) => {
     try {
          const pet = Pet.find({petId: request.params._id}
          );
          if (!pet) {
            return response.status(404).json({message: 'Pet not found'});
          }
          return response.json(pet);
        } catch (error) {
          next(error);
        }
      }
);

router.post("/",
// verifyJwtHeader,
// uniquePetCheck, 
// errorhandler,
async (request, response) => {
     let newPet = await Pet.create(request.body).catch(error => error);
     response.json(newPet);
});

router.put("/",
async (request, response) => {});

router.delete("/",
async (request, response) => {});

module.exports = router;