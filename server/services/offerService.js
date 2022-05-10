const Offer = require('../models/Offer')
const User = require('../models/User')

async function createOffer(items) {
    let offer = new Offer(items)
    return await offer.save();
}

async function findByOwner(owner) {
    return await Offer.find({owner});
}
module.exports = {
    createOffer,
    findByOwner
}