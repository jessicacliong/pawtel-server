const express = require('express');
const router = express.Router();

const { Role } = require('../models/RoleModel');

const { 
    getUsersWithRole, 
    getAllRoles 
} = require('../functions/RolesFunctions');

const { 
    verifyJwtRole
} = require('../functions/UserFunctions');

const { 
    verifyJwtHeader 
} = require('../middleware/checkMiddleware');

const { 
    filterUsersMiddleware
} = require('../middleware/filteringMiddleware');


// Return all roles
router.get(
    '/',
    verifyJwtHeader,
    verifyJwtRole,
    filterUsersMiddleware,
    async (request, response, next) => {
        try {
            let allRoles = null;

            allRoles = await getAllRoles();

            response.json({
                rolesCount: allRoles.length,
                roles: allRoles
            });

        } catch (error) {
            next(error);
    }
});

// Return all users with a matching role
router.get(
    '/:roleName', 
    verifyJwtHeader,
    verifyJwtRole,
    filterUsersMiddleware,
    async (request, response, next) => {
    try {
        let role = await getUsersWithRole(request.params.roleName);
    
        if (role.length == 0 || role == 0) {
            return response.status(404).json({message: 'Role not found'});
        }

        response.json(role);

    } catch (error) {
        next(error);
    }
});
 

module.exports = router;