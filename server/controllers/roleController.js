const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');
const isAuth = require('../middlewares/isAuth')
const Role = require('../models/Roles');
const User = require('../models/User');
const moment = require('moment');

const roleService = require('../services/roleService');

router.get('/admin/role', isAuth, async (req, res) => {
    const { search } = req.query;
    try {
        let role;
        if (search !== '' && search !== undefined) {
            role = await Role.find();
            role = role.filter(x => x.name.toLowerCase().includes(search.toLowerCase()) || x.permissions.toLowerCase().includes(search.toLowerCase()))
            res.status(200).json({ role: role, pages: role.pages });
        } else {
            res.status(200).json({ role: role.docs, pages: role.pages });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})




router.post('/admin/create', async (req, res) => {
    let { name, permissions } = req.body;
    try {
        let errors = [];
        if (name.length < 3 || name.length > 10) errors.push('name should be at least 3 characters long and max 10 characters long; ');
        if (description.length < 10 || description.length > 1000) errors.push('Description should be at least 10 characters long and max 1000 characters long; ');

        if (errors.length >= 1) throw { message: [errors] };

        let role = new Role({
            name, permissions,

        })

        await role.save()
        await roleService.userCollectionUpdate(req.user._id, role);

        res.status(201).json({ roleId: role._id });
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: err.message })
    }
});






module.exports = router;