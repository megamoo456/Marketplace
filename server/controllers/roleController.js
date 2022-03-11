const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');
const isAuth = require('../middlewares/isAuth')
const Role = require('../models/Roles');
const User = require('../models/User');
const moment = require('moment');

const roleService = require('../services/roleService');
const userService = require('../services/userService');

router.get('/roles', isAuth, async (req, res) => {
    try {
        let user = await roleService.getUserById(req.params.id);
        let jsonRes = {
            _id: user._id, name: user.name, email: user.email, phoneNumber: user.phoneNumber,
            totalSells: user.createdSells.length, avatar: user.avatar,
            isMe: req.user._id == req.params.id
        }
        res.status(200).json({user: jsonRes});
    } catch (error) {
        res.status(500).json({ error });
    }
})




router.post('role/create', async (req, res) => {
    let { name, permissions } = req.body;
    try {
        let errors = [];
        if (name.length < 3 || name.length > 10) errors.push('name should be at least 3 characters long and max 10 characters long; ');

        if (errors.length >= 1) throw { message: [errors] };

        let role = new Role({
            name, permissions,

        })

        await role.save()
        //await roleService.userRoleUpdate(req.user._id, role);

        res.status(201).json({ roleId: role._id });
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: err.message })
    }
});






module.exports = router;