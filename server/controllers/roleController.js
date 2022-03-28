const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');
const isAuth = require('../middlewares/isAuth')
const Role = require('../models/Roles');
const User = require('../models/User');
const moment = require('moment');

const roleService = require('../services/roleService');
const userService = require('../services/userService');

router.get('/all', async (req, res) => {
    try {
        let role = [];
        p =  await Role.find();
        for (let i = 0; i < p.length; i++) {
            if (p[i].name != "Admin")
			role.push(p[i]);
		}
        res.status(200).json(role);
     
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/', async (req, res) => {
    try {
        let role = [];
        p =  await Role.find();
        for (let i = 0; i < p.length; i++) {
			role.push(p[i].transform());
		}
        res.status(200).json(role);
     
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.delete('/delete/:id', async (req, res) => {
    let { id } = req.body;
    try {
        let role = await Role.findByIdAndDelete(req.params.id);
        
        res.status(201).json({ role });
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: error.message })
    }
});



router.post('/create', async (req, res) => {
    let { name, permissions } = req.body;
    try {
        let errors = [];
        if (name.length < 3 || name.length > 11) errors.push('name should be at least 3 characters long and max 10 characters long; ');

        if (errors.length >= 1) throw { message: [errors] };

        let role = new Role({
            name, permissions,

        })

        await role.save()
        //await roleService.userRoleUpdate(req.user._id, role);

        res.status(201).json({ role });
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: err.message })
    }
});

///// Partie Admin ////

router.get('/:id', async (req, res) => {
    try {
        let role = await roleService.getRoleById(req.params.id);
		r = role.transform();
        res.status(200).json(r);
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.put('/:id', async (req, res) => {
    let { name, permissions } = req.body;
    try {
        let errors = [];
        if (name.length < 3 || name.length > 11) errors.push('name should be at least 3 characters long and max 10 characters long; ');

        if (errors.length >= 1) throw { message: [errors] };

  
      
        if (errors.length >= 1) throw { message: [errors] };

         await roleService.edit(req.params.id, { name, permissions });
        res.status(201).json({ message: 'Updated!' });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})





module.exports = router;