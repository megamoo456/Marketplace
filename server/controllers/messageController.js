const router = require('express').Router();
const ChatRoom = require('../models/ChatRoom')
const Offer = require('../models/Offer')
const User = require('../models/User');
const messageService = require('../services/messageService')

router.post('/createChatRoom', async (req, res) => {
    const { message, receiver, offer } = req.body;
 
    try {
        let allChats = await ChatRoom.find().populate("seller").populate("buyer");
        for (let i = 0; i < allChats.length; i++) {
            if (allChats[i].seller._id == receiver && allChats[i].buyer._id == req.user._id ){
            return await ChatRoom.updateOne({ _id: allChats[i]._id}, { $push: { conversation: { senderId: req.user._id, message, offer } } })
             }     
		}
        let chatRoom = await messageService.createChatRoom(req.user._id, receiver)
        await ChatRoom.updateOne({ _id: chatRoom._id }, { $push: { conversation: { senderId: req.user._id, message , offer } } })
        res.status(200).json({ messageId: chatRoom._id , offerId: chatRoom._id})
       
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/sendreport', async (req, res) => {
    const { id,reason,messageR,buyerid,sellerid} = req.body;
    let user={}

    if(req.user._id == sellerid){
     user = await User.updateOne({ _id: buyerid }, { $push: { reports: { Reason: reason, details:messageR } } });
    } else{
     user = await User.updateOne({ _id: sellerid }, { $push: { reports: { Reason: reason, details:messageR } } });
    } 
     console.log(user)
    res.status(200).json({ user })
})

router.get('/getUserConversations', async (req, res) => {
    let allChats = await ChatRoom.find().populate("buyer").populate("seller");
    let userChats = allChats.filter(x => x.buyer._id == req.user._id || x.seller._id == req.user._id)
    let checkedChats = userChats.map(x => ({ chats: x, isBuyer: (x.buyer._id == req.user._id), myId: req.user._id }))
    res.status(200).json(checkedChats)
})

router.get('/getOfferConversations', async (req, res) => {
    let allOffers = await Offer.find().populate("owner").populate("seller");
    let userOffers = allOffers.filter(x => x.owner._id == req.user._id || x.seller._id == req.user._id)
    let checkedOffers =  userOffers.map(x => ({offers:x,  isSeller: (x.seller._id == req.user._id) }))
    res.status(200).json(checkedOffers)
})


router.post('/sendMessage', async (req, res) => {
    const { chatId, message } = req.body;
    let chat = await ChatRoom.updateOne({ _id: chatId }, { $push: { conversation: { senderId: req.user._id, message } } })

    console.log(chat)
    res.status(200).json({ sender: req.user._id })
})

router.delete('/deleteOffer/:id', async (req, res) => {
    let {  id ,owner,seller} = req.body;
    try {
        let offer = await Offer.findByIdAndDelete(req.params.id);
        let user = await User.updateOne({ _id: owner }, {$pull: {yourOffers: req.params.id}});
        let slr = await User.updateOne({ _id: seller }, {$pull: {yourOffers: req.params.id}});
        
        res.status(201).json({ offer,user,slr});
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: error.message })
    }
})

router.patch('/rejectOffer/:id', async (req, res) => {
    let { chatId } = req.body;
    try {
        let statue = await Offer.updateOne({ _id: req.params.id }, { $set: { statue: "Rejected" } });
        let chat = await ChatRoom.updateOne({ _id: chatId }, { $pull: { conversation: { offer: req.params.id} } })

        
        res.status(201).json({ statue , chat});
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: error.message })
    }
})
module.exports = router;