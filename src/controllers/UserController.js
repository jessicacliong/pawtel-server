const getUser = (request, response) => {};

const getUsers = (request, response) => {};

const registerUser = 
async (request, response) => {
     const userDetails = {
          first_name: request.body.first_name,
          last_name: request.body.last_name,
          email: request.body.email,
          username: request.body.username,
          password: request.body.password,
     };
     let newUserDet= await createUser(userDetails);

     response.json({
          user: newUserDet,
     });
}

const loginUser = 
async (request, response) => {
     let thatUser = await User.findOne({email: request.body.email}).exec();
     try {
       if (await validateHashedData(request.body.password, thatUser.password)) {
         let encryptedUserJwt = await generateUserJWT({
           userID: thatUser._id,
           email: thatUser.email,
           password: thatUser.password,
         });
         response.json({jwt: encryptedUserJwt});
       }
     } catch {
       response.status(400).json({message: 'Invalid user details provided.'});
     }
}

const getUser = (request, response) => {};




module.exports = {
     registerUser,
     loginUser,
}
