const User = require('../models/User');


async function edit(userId, userData) {
    return await User.updateOne({ _id: userId }, { $set: { ...userData } });
}

async function getUserById(userId) {
    return await User.findById(userId).populate("createdSells").lean();
}

async function getUserRById(userId) {
    return await User.findById(userId);
}
module.exports = {
    edit,
    getUserRById,
    getUserById
    // userCollectionUpdate,
    // findUserById
}