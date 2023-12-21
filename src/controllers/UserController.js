const { User } = require('../models/UserModel');


const getUsers = async (request, response) => {
	let result = await User.find({});
 	response.json({result});
}

const getUser = (request, response) => {};


// Sign-up a new user
const registerUser = 
async (request, response) => {
     let newUser = await User.create(request.body).catch(error => error);
     response.json(newUser);
};


const loginUser = 
async (request, response) => {
     let thatUser = await User.findOne({email: request.body.email}).exec();
     try {
       if (await validateHashedData(request.body.password, thatUser.password)) {
         let encryptedUserJwt = await generateUserJWT({
           userID: thatUser._id,
           username: thatUser.username,
           password: thatUser.password,
         });
         response.json({jwt: encryptedUserJwt});
       }
     } catch {
       response.status(400).json({message: 'Invalid user details provided.'});
     }
}

const verifyUser = (request, response) => {};

const regenerateUserJWT = (request, response) => {};


module.exports = {
     getUser,
     getUsers,
     registerUser,
     loginUser,
     verifyUser,
     regenerateUserJWT
}
