const { Router } = require('express');
const router = Router();
const authService = require('../services/authService');
const { cloudinary } = require('../config/cloudinary');
const User = require('../models/User');
// const isAuth = require('../middlewares/isAuth')
const productService = require('../services/productService');
const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const { SALT } = require('../config/config')


router.get('/', async (req, res) => {
    try {
        let user = [];
        p =  await User.find();
        for (let i = 0; i < p.length; i++) {
			user.push(p[i].transform());
		}
        res.status(200).json(user);
     
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


///// Partie Role Delete+Create ////
router.post('/create', async (req, res) => {
    try {
        let createdUser = await authService.registerUser(req.body)
        res.status(201).json({ _id: createdUser._id });
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: error.message })
    }
});

router.delete('/delete/:id', async (req, res) => {
    let { id } = req.body;
    try {
        let user = await User.findByIdAndDelete(req.params.id);
        
        res.status(201).json({ user });
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: error.message })
    }
});
////////////////////

router.patch('/edit-profile/:id', async (req, res) => {
    //TODO: Rewrite this 
    let { name, phoneNumber, email } = req.body;
    try {
        let errors = [];
        let checkUser = await User.findOne({ email });

        if (checkUser && checkUser._id.toString() !== req.user._id.toString()) errors.push('This email address is already in use; ');
        if (name.length < 3 || name.length > 50) errors.push('Name should be at least 3 characters long and max 50 characters long; ')
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) errors.push("Please fill a valid email address; ");

        if (req.body.avatar) {
            if (!req.body.avatar.includes('image')) errors.push('The uploaded file should be an image; ');
        }

        if (errors.length >= 1) throw { message: [errors] };

        if (req.body.avatar) {
            let compressedImg = await productService.uploadImage(req.body.avatar);
            await userService.edit(req.params.id, { name, phoneNumber, email, avatar: compressedImg });
            res.status(201).json({ message: 'Updated!', avatar: compressedImg });
        } else {
            await userService.edit(req.params.id, { name, phoneNumber, email });
            res.status(201).json({ message: 'Updated!' });
        }
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})
router.get('/affect/:id', async (req, res) => {
    try {
        let user = await userService.getUserById(req.params.id);
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

router.get('/getUserById/:id', async (req, res) => {
    try {
        let user = await userService.getUserById(req.params.id);
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
///// Partie Role Edit  ////

router.get('/:id', async (req, res) => {
    try {
        let user = await userService.getUserRById(req.params.id);
		p = user.transform();
        res.status(200).json(p);
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.put('/:id', async (req, res) => {
    let { name, phoneNumber, email , password ,repeatPassword, role} = req.body;
    let salt = await bcrypt.genSalt(SALT);
    let hash = await bcrypt.hash(password, salt);
   
    try {
        let errors = [];
        let checkUser = await User.findOne({ email });

        if (name.length < 3 || name.length > 50) errors.push('Name should be at least 3 characters long and max 50 characters long; ')
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) errors.push("Please fill a valid email address; ");
        if (password !== repeatPassword) errors.push("Passwords should match; " );
        if (password.length < 8) errors.push("Password should be at least 8 characters long; " );
        if (password.length > 20) errors.push("Password should be at max 20 characters long; " );
        if (errors.length >= 1) throw {message: [errors]}
      
        if (errors.length >= 1) throw { message: [errors] };
        password = hash;
         await userService.edit(req.params.id, { name, phoneNumber, email, password ,repeatPassword, role });
         
        res.status(201).json({ message: 'Updated!' });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})
////////////////////// 
/* Get Owner params from offers */
router.get('/getowner/:id', async (req, res) => {
    try {
        let user = await (await User.findById(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;