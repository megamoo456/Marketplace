const Role = require('../models/Roles');
const User = require('../models/User');

async function edit(roleId, roleData) {
    return await Role.updateOne({ _id: roleId }, { $set: { ...roleData } });
}

async function getRoleById(roleId) {
    return await Role.findById(roleId);
}

async function createRole(data, userId) {
    let role = new Role({...data})
    await role.save();

    return await User.updateOne({ _id: userId }, { $push: { role: role } });
}
module.exports = {
    edit,
    createRole,
    getRoleById
    // userCollectionUpdate,
    // findUserById
}