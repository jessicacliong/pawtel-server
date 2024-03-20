const { User } = require('../models/UserModel');


const filterUsersMiddleware = async (request, response, next) => {

     const filteredUser = await User.findById(request.params.userId);

     if (request.headers.userRole == "staff" ||  filteredUser == request.headers.userId) {
       next();
     } else {
       next(new Error("User not authorized."));
     }
}

module.exports = {
     filterUsersMiddleware,

};