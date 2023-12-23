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
     filterUndefinedProperty,
     getAllUsers,
     getSpecificUser,
     createUser, 
     updateUser, 
     deleteUser
} = require('../functions/UserFunctions');

const {
     verifyJwtHeader,
     errorHandler,
     uniqueEmailCheck
} = require('../middleware/checkMiddleware');


// Get all existing users
// /users/
router.get("/",
    //  verifyJwtHeader,
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
// verifyJwtHeader,
// uniqueEmailCheck, 
// errorhandler,
     async (request, response) => {
          let newUser = await User.create(request.body).catch(error => error);
          response.json(newUser);
     });

// Login an existing user
// Post users/login
router.post('/login',
async (request, response, next) => {
     try {
       let targetUser = await User.findOne({username: request.body.username}).exec();
       console.log(targetUser)
       console.log(request.body.username)
       if (!targetUser) {
         return response.status(404).json({message: 'User not found.'});
       }
   
       if (await validateHashedData(request.body.password, targetUser.password)) {
         let encryptedUserJwt = await generateUserJWT({
           userId: targetUser.userId,
           username: targetUser.username,
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


// Refreshing a user's JWT token
router.post('/token-refresh', async (request, response, next) => {
  try {
    let oldToken = request.body.jwt;
    let refreshResult = await verifyUserJWT(oldToken);
    response.json({jwt: refreshResult});
  } catch (error) {
    next(error);
  }
});

// Update an existing user
router.put('/:userId', errorHandler, async (request, response, next) => {
  try {
    const requestUserId = await getUserIdFromJwt(request.headers.jwt);

    // Ensure that the user can only update their own account
    if (requestUserId !== request.params.userId) {
      return response
        .status(403)
        .json({message: 'Unauthorised: You can only update your own account!'});
    }

    const {
      firstName,
      lastName,
      email,
      username,
      password,
    } = request.body;

    const userDetails = {
      userId: request.params.userId,
      updatedData: {
        firstName,
        lastName,
        email,
        username,
        password,
      },
    };

    const updatedUser = await updateUser(userDetails);

    if (!updatedUser) {
      return response.status(404).json({message: 'User not found'});
    }

    return response.json(updatedUser)
  } catch (error) {
    next(error);
  }
});

// Delete user account
// Will action if the request has the same userId
router.delete('/:userId', verifyJwtHeader, async (request, response, next) => {
  try {
    const requestUserId = await getUserIdFromJwt(request.headers.jwt);
    const targetUserId = request.params.userId;

    // Check if the user making the request is the same as the user whose data is being deleted
    if (requestUserId !== targetUserId) {
      return response.status(403).json({
        message: 'Unauthorised. You can only delete your own account.',
      });
    }

    // Proceed with the delete operation
    const deletedUser = await deleteUser(targetUserId);

    if (!deletedUser) {
      return response.status(404).json({message: 'User not found'});
    }

    return response.json({message: 'User deleted successfully'});
  } catch (error) {
    if (error.path === '_id') {
      return response.status(404).json({message: 'User not found'});
    }
    next(error);
  }
});


module.exports = router;