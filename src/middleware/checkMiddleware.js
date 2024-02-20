const { verifyUserJWT } = require('../functions/UserFunctions');
const { User } = require('../models/UserModel');

// Middleware to verify if the JWT is available in the headers
const verifyJwtHeader = async (request, response, next) => {
  try {
    const rawJwtHeader = request.headers.jwt;

    let jwtRefresh;
    try {
      jwtRefresh = await verifyUserJWT(rawJwtHeader);
    } catch (error) {
      handleJwtVerificationError(error, response);
      return;
    }

    request.headers.jwt = jwtRefresh;
    next();
  } catch (error) {
    handleGenericError(error, response);
  }
};

// Handles errors related to JWT verification and sends appropriate responses.
const handleJwtVerificationError = (error, response) => {
  if (error.message === 'TokenExpired') {
    response.status(401).json({
      error: 'Token expired',
      message:
        'The provided token has expired. Please log in again to obtain a new token.',
    });
  } else if (error.message === 'InvalidToken') {
    response.status(401).json({
      error: 'Invalid JWT',
      message: 'The provided token is invalid.',
    });
  } else {
    handleGenericError(error, response);
  }
};

// Handles generic errors and sends an internal server error response.
const handleGenericError = (error, response) => {
  console.error(error);
  response.status(500).json({
    error: 'Internal Server Error',
    message: error.message,
  });
};


// Middleware to handle uncaught errors
const errorHandler = (error, request, response, next) => {
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
     handleJwtVerificationError,
     handleGenericError,
     errorHandler,
     uniqueEmailCheck
};