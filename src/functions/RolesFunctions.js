const { Role } = require('../models/RoleModel');
const { User } = require('../models/UserModel');

const dotenv = require('dotenv');
dotenv.config();

// Returns all roles in the database
async function getAllRoles(){
    return await Role.find({});
}

// Returns documents that have a specified role name
async function getUsersWithRole(roleName){

    // Get the role ID for the role specified
    let roleId = await Role.findOne({name: roleName}).exec();

    // Filter through the Users to find only the ones
    // with the matching role ID.
    let usersFound = await User.find({role: roleId}).exec();

    return usersFound;
}

// Export the functions for our routes to use.
module.exports = {
    getAllRoles,
    getUsersWithRole
}