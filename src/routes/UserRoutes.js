const express = require('express');

const router = express.Router();

const {
     getUsers,
     getUser,
     makeUser,
     updateUser,
     removeUser
} = require('../controllers/UserController');

// GET all users
router.get("/", getUsers);

// GET one user by ID
