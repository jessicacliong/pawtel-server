const express = require('express');

const router = express.Router();

const { 
     registerUser,
     loginUser,
     getUser,
     getUsers,
     createUser, 
     updateUser, 
     deleteUser,
     verifyUser,
     regenerateUserJWT
} = require('../controllers/UserController');

// Get all existing users
router.get('/', getUsers);

// Get user by id
// /users/number
router.get('/:id', getUser);

// Register a new user
router.post('/register', registerUser);

// Login an existing user
// Post users/login
router.post('/login', loginUser);

// Verify User is authorised to perform action
// JWT in request.headers["jwt"] or request.headers["authorization"]
// respond with {jwt: "laskdnalksfdnal;fgvkmsngb;sklnmb", valid: true}
router.get("/verify", verifyUser);

// // JWT in request.headers["jwt"] or request.headers["authorization"]
// respond with {jwt: "laskdnalksfdnal;fgvkmsngb;sklnmb", valid: true}
router.get("/regenerate", regenerateUserJWT);


module.exports = router;