// Import Express Library
const express = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models/UserModel');

// make an instance of a Router
const router = express.Router();

const { 
  encryptString,
  decryptString,
  decryptObject,
  validateHashedData,
  generateUserJWT,
  verifyUserJWT,
  getUserIdFromJwt,
  filterUndefinedProperty,
  getAllUsers,
  createUser, 
  updateUser, 
  deleteUser
} = require('../functions/UserFunctions');


const {
  verifyJwtHeader,
  errorHandler,
  uniqueEmailCheck
} = require('../middleware/checkMiddleware');


// Register a new user
// /users/register
router.post('/register', 
uniqueEmailCheck, 
errorHandler,
async (request, response, next) => {
  try {
    const userDetails = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      username: request.body.username,
      password: request.body.password,
    };
  
    let newUser = await createUser(userDetails);
    
    response.json({
      newUser
    });
    } catch (error) {
      next(error);
    } 
  }
);

// Login an existing user
// Post users/login
router.post(
  '/login',
  async (request, response, next) => {
    try {
       let targetUser = await User.findOne({email: request.body.email}).exec();
       if (!targetUser) {
         return response.status(404).json({message: 'User not found.'});
       }
   
       if (await validateHashedData(request.body.password, targetUser.password)) {
         let encryptedUserJwt = await generateUserJWT({
           userId: targetUser._id,
           email: targetUser.email,
           password: targetUser.password,
         });
         response.json({jwt : encryptedUserJwt});
       } else {
         response.status(401).json({message: 'Invalid password.'});
       }
     } catch (error) {
       next(error);
     }
  });


// Refreshing a user's JWT token
router.post(
  '/token-refresh', 
  async (request, response, next) => {
    try {
      let oldToken = request.body.jwt;
      let refreshResult = await verifyUserJWT(oldToken);
      response.json({jwt: refreshResult});
    } catch (error) {
      next(error);
    }
});

// Get all existing users
// /users/
router.get(
  '/',
    async (request, response) => {
      let allUsers = await getAllUsers();

      response.json({
        userCount: allUsers.length,
        users: allUsers
    });
  });

// Get user by id
// /users/:userId
router.get(
  '/:userId', 
  // verifyJwtHeader,
     async (request, response, next) => {
      try {
        const user = await User.findOne({_id: request.params.userId});

        if (!user) {
          return response.status(404).json({message: 'User not found'});
        }

        return response.json(user);

      } catch (error) {
        next(error);
      }
    }
  );

// Update an existing user
router.put('/:userId',
verifyJwtHeader, 
async (request, response, next) => {
  try {
    const requestingUserId = await getUserIdFromJwt(request.headers.jwt);
    const targetUserId = request.params.userId;

    // Check if the user making the request is the same as the user whose data is being deleted
    if (requestingUserId !== targetUserId) {
      return response.status(403)
        .json({message: 'Unauthorised: You can only update your own account'});
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
      updatedData: filterUndefinedProperty({
        firstName,
        lastName,
        email,
        username,
        password,
      }),
    };

    const updatedUser = await updateUser(userDetails);

    return response.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// Delete user account
// Will action if the request has the same userId
router.delete(
  '/:userId', 
  verifyJwtHeader, 
  async (request, response, next) => {
    try {
      const requestingUserId = await getUserIdFromJwt(request.headers.jwt);
      const targetUserId = request.params.userId;

      // Check if the user making the request is the same as the user whose data is being deleted
      if (requestingUserId !== targetUserId) {
        return response.status(403)
          .json({message: 'Unauthorised. You can only delete your own account.',
        });
      }

      // Proceed with the delete operation
      const deletedUser = await deleteUser(targetUserId);

      return response.json({message: 'User successfully deleted.'});
    } catch (error) {
      next(error);
    }
});


module.exports = router;