const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
      fullName: String,
       phoneNumber: String ,
        addressLine: String,
        city: String,
        state: String,
        code: String,
        country: String,
        shipping: Boolean
  });
  
const offerSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },
    items: {
        type: Array,
    },
    subtotal: {
        type: Number,
    },
    statue:{
        type:Array,
            default:['Pending']
    },
    adress:{
        type: childSchema,
        default: () => ({})
      },
    
});


module.exports = mongoose.model('Offer', offerSchema);