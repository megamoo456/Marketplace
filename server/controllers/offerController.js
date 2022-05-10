const router = require('express').Router();
const Offer = require('../models/Offer')
const User = require('../models/User')
const Product = require('../models/Product');
const offerService = require('../services/offerService')


router.post('/createOffer', async (req, res) => {
    try {
        let offer = await offerService.createOffer(req.body)
        res.status(200).json({offer})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/offer/:id', async (req, res) => {
    try {
        let user = await User.findById(req.user._id);
        let offer =  await offerService.findByOwner(req.user._id);
        if (!user.yourOffers.includes(req.params.id)) {
            await User.updateOne({ _id: req.user._id }, { $push: { yourOffers: req.params.id } });
            res.status(200).json({ msg: "offer added !" });
        } 
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/offerlist/:id', async (req, res) => {
    try {
        let user = await (await User.findById(req.user._id).populate('yourOffers')).toJSON();

        res.status(200).json({ yourOffers: user.yourOffers });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


module.exports = router;