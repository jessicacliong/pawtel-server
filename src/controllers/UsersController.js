// Import Express Library
const express = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models/UserModel');

// make an instance of a Router
const router = express.Router();

const { 
     encryptString,decryptString,decryptObject,
     validateHashedData,generateJWT,generateUserJWT,
     verifyUserJWT,getUserIdFromJwt,
     getAllUsers,
     getSpecificUser,
     createUser, 
     updateUser, 
     deleteUser
} = require('../functions/UserFunctions');

const {
     verifyJwtHeader,
     errorhandler,
     uniqueEmailCheck
} = require('../middleware/checkMiddleware');


// Get all existing users
// /users/
router.get("/",
     verifyJwtHeader,
     async (request, response) => {
          let result = await User.find({});
          response.json({result});
});

// Get user by id
// /users/:id
router.get("/:id", 
     async (request, response) => {});


// Register a new user
// /users/register
router.post('/register', 
verifyJwtHeader,
uniqueEmailCheck, 
errorhandler,
     async (request, response) => {
          let newUser = await User.create(request.body).catch(error => error);
          response.json(newUser);
     });

// Login an existing user
// Post users/login
router.post('/login',
async (request, response, next) => {
     try {
       let targetUser = await User.findOne({email: request.body.email}).exec();
       console.log(targetUser)
       console.log(request.body.email)
       if (!targetUser) {
         return response.status(404).json({message: 'User not found.'});
       }
   
       if (await validateHashedData(request.body.password, targetUser.password)) {
         let encryptedUserJwt = await generateUserJWT({
           userId: targetUser._id,
           email: targetUser.email,
           password: targetUser.password,
         });
         response.json({jwt: encryptedUserJwt});
       } else {
         response.status(401).json({message: 'Invalid password.'});
       }
     } catch (error) {
       next(error);
     }
   });


// Refreshing user's JWT token
router.post('/token-refresh', async (request, response, next) => {
  try {
    let oldToken = request.body.jwt;
    let refreshResult = await verifyUserJWT(oldToken);
    response.json({jwt: refreshResult});
  } catch (error) {
    next(error);
  }
});



module.exports = router;