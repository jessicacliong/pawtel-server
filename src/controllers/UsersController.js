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
  verifyJwtRole,
  getUserIdFromJwt,
  filterUndefinedProperty,
  getAllUsers,
  createUser, 
  updateUser, 
  deleteUser
} = require('../functions/UserFunctions');


const {
  verifyJwtHeader,
  handleJwtVerificationError,
  handleGenericError,
  errorHandler,
  uniqueEmailCheck
} = require('../middleware/checkMiddleware');


const {
  filterUsersMiddleware
} = require('../middleware/filteringMiddleware');

// Register a new user
// /users/register
router.post(
  '/register', 
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
          role: request.body.role
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
    verifyJwtHeader,
    verifyJwtRole,
    filterUsersMiddleware,
    async (request, response) => {
    try {
      let allUsers = await getAllUsers();

      response.json({
        userCount: allUsers.length,
        users: allUsers
    });
    } catch (error) {
      next(error);
    }
  }
);

// Get user by id
// /users/:userId
router.get(
  '/:userId', 
  verifyJwtHeader,
  verifyJwtRole,
  filterUsersMiddleware,
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
// /users/:userId 
// Action will execute if user is authorised to perform the action
router.put(
  '/:userId',
  verifyJwtHeader, 
  verifyJwtRole,
  filterUsersMiddleware,
    async (request, response, next) => {
      try {
        const {
          firstName,
          lastName,
          email,
          username,
          password,
          role
        } = request.body;

        const userDetails = {
          userId: request.params.userId,
          updatedData: filterUndefinedProperty({
            firstName,
            lastName,
            email,
            username,
            password,
            role
          }),
        };

        const updatedUser = await updateUser(userDetails);

        return response.json(updatedUser);
      } catch (error) {
        next(error);
      }
    }
  );

// Delete an existing user
// /users/:userId 
// Action will execute if user is authorised to perform the action
  router.delete(
    '/:userId', 
    verifyJwtHeader, 
    verifyJwtRole,
    filterUsersMiddleware,
    async (request, response, next) => {
      try {
        // Proceed with the delete operation
        const deletedUser = await deleteUser({_id:request.params.userId});

          return response.json({message: 'User successfully deleted.'});
      } catch (error) {
        next(error);
      }
    }
);


module.exports = router;