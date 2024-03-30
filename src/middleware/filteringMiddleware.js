const { User } = require('../models/UserModel');
const { Pet } = require('../models/PetModel');
const { Booking } = require('../models/BookingModel');
const { Room } = require('../models/RoomModel');

const {
  getUserIdFromJwt
} = require('../functions/UserFunctions');

const { 
  errorHandler 
} = require('./checkMiddleware');



const filterUsersMiddleware = async (request, response, next) => {
  try {
    const requestingUserId = await getUserIdFromJwt(request.headers.jwt);
    const targetUserId = request.params.userId;

      if ( targetUserId == requestingUserId || request.headers.userRole == "staff" ) {
      next ();
      } else 
        return response
          .status(403)
          .json({message: 'User unauthorised to perform action.'});
  } catch (error) {
    errorHandler(error, request, response, next);
  }
};


const filterPetsMiddleware = async (request, response, next) => {
  try {
    const requestingUserId = await getUserIdFromJwt(request.headers.jwt);
      
    const userIDofPet = await Pet.findById(request.params.petId).exec()
    .then((data) => {return data.userId});

    if ( requestingUserId == userIDofPet || request.headers.userRole == "staff" ) {
      next ();
      } else 
        return response
          .status(403)
          .json({message: 'User unauthorised to perform action.'});

  } catch (error) {
    errorHandler(error, request, response, next);
  }
};

const filterRolesMiddleware = async (request, response, next) => {
  try {
    if ( request.headers.userRole == "staff" ) {
      next();
    } else 
    return response
      .status(403)
      .json({message: 'User unauthorised to perform action.'});
  } catch(error) {
    next(error)
  }
};


module.exports = {
     filterUsersMiddleware,
     filterPetsMiddleware,
     filterRolesMiddleware,
};