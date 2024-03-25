const { User } = require('../models/UserModel');

const {
  getUserIdFromJwt,
} = require('../functions/UserFunctions');

const { 
  errorHandler 
} = require('./checkMiddleware');


const filterUsersMiddleware = async (request, response, next) => {
  try {

    const requestingUserId = await getUserIdFromJwt(request.headers.jwt);
    const targetUserId = request.params.userId;

      if ( targetUserId == requestingUserId || request.headers.userRole == "staff") {
      next ();
      } else 
        return response
          .status(403)
          .json({message: 'User unauthorised to perform action.'});
  } catch (error) {
    errorHandler(error, request, response, next);
  }
};


module.exports = {
     filterUsersMiddleware,
};