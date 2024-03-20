const express = require('express');
const router = express.Router();

const { Role } = require('../models/RoleModel');

const { 
     getUsersWithRole, 
     getAllRoles 
} = require('../functions/RolesFunctions');

// Return all roles
router.get('/', async (request, response) => {
     let responseData = {};
 
     responseData = await getAllRoles();
 
     response.json({
         data: responseData
     });
});

// Return all users with a matching role
router.get('/:roleName', async (request, response) => {
     let responseData = {};
 
     responseData = await getUsersWithRole(request.params.roleName);
 
     response.json({
         data: responseData
     });
 });
 

module.exports = router;