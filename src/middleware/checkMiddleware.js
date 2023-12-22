const { verifyUserJWT } = require('../functions/UserFunctions');
const { User } = require('../models/UserModel');

// Middleware to verify if the JWT is available in the headers
const verifyJwtHeader = async (request, response, next) => {
     try {
       let rawJwtHeader = request.headers.jwt;
   
       let jwtRefresh = await verifyUserJWT(rawJwtHeader);
   
       request.headers.jwt = jwtRefresh;
   
       next();
     } catch (error) {
       // Handle JWT verification errors
       response.status(401).json({
         error: 'Invalid JWT',
       });
     }
   };

// Middleware to handle uncaught errors
const errorhandler = (error, request, response, next) => {
     console.error('Unhandled error:', error);
   
     // Handle and respond to the client appropriately
     if (response.headersSent) {
       return next(error);
     }
   
     response.status(500).json({
       error: 'Internal Server Error',
       message: error.message,
     });
   };

// Middleware to validate a unique user email is used
const uniqueEmailCheck = async (request, response, next) => {
     try {
       const isEmailUsed = await User.exists({ email: request.body.email }).exec();
       if (isEmailUsed) {
         return response.status(409).json({
           error: 'Conflict',
           message: 'An account with this email address already exists.',
         });
       } else {
         next();
       }
     } catch (error) {
       next(error);
     }
};

module.exports = {
     verifyJwtHeader,
     errorhandler,
     uniqueEmailCheck,
};