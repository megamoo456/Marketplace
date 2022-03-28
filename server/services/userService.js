const User = require('../models/User');


async function edit(userId, userData) {
    return await  User.updateOne({ _id: userId }, { $set: { ...userData } });
}

async function getUserById(userId) {
    return await User.findById(userId).populate("createdSells").lean();
}

async function deleteUserByName(userData) {
    return await User.deleteModel(userData);
}

async function getUserRById(userId) {
    return await User.findById(userId);
}
module.exports = {
    edit,
    getUserRById,
    deleteUserByName,
    getUserById
        // userCollectionUpdate,
    // findUserById
}