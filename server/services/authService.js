const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');
const ROLES = require('../models/Roles');

async function registerUser(userData) {
    let { name, email, gender, phoneNumber ,role, password, repeatPassword } = userData;
    let errors = [];
    let checkUser = await User.findOne({ email });
    if (checkUser) errors.push('This email address is already in use; ');
    if (name.length < 3 || name.length > 50) errors.push('Name should be at least 3 characters long and max 50 characters long; ')
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) errors.push("Please fill a valid email address; " );
    if (password !== repeatPassword) errors.push("Passwords should match; " );
    if (password.length < 8) errors.push("Password should be at least 8 characters long; " );
    if (password.length > 20) errors.push("Password should be at max 20 characters long; " );
    if (errors.length >= 1) throw {message: [errors]}
    if (role) {
      for (let i = 0; i < role.length; i++) {
        if (ROLES.id !==  role[i]) {
          errors.push ('Failed! Role does not exist = ' + role[i]);
        }
      }
    }

    let user = new User(userData);
    return await user.save();
}


async function loginUser({ email, password }) {
    let user = await User.findOne({ email });
    if (!user) throw { message: 'Invalid email ' };

    let hasValidPass = await bcrypt.compare(password, user.password);
    if (!hasValidPass) throw { message: "Invalid  password" }

    let token = jwt.sign({ _id: user._id, email: user.email, phoneNumber: user.phoneNumber, createdSells: user.createdSells.length, avatar: user.avatar , role :user.role}, SECRET);
    return token;
}

async function getUser(id) {
    return await User.findById(id).lean()
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}