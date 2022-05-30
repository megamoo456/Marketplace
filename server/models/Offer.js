const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
    transporter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isCounteredbyseller:{
        type:Boolean,
            default:false

    },
    isCounteredbybuyer:{
        type:Boolean,
        default:false
    },
    adress:{
        type: childSchema,
        default: () => ({})
      },
    
});
offerSchema.plugin(mongoosePaginate);

offerSchema.method('transform', function() {
    var obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
  
    return obj;
  });

module.exports = mongoose.model('Offer', offerSchema);