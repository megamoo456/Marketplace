const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    title: {
        type: String,
        trim: true,
        required: 'please fill the title of the article'
    },
    image: {
        type: String,
        required: true
    },
    addedAt: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: ['Description is required'],
        minlength: [10, 'Description should be at least 10 characters long']
       
    },
    tags:[{
        type: String
    }],
    articleowner:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    blogr:{
        type:String
    },
    comments: [
        {
            userId:{
                type: mongoose.Types.ObjectId,
                ref: 'User'
            },
            message:{
                type:String,
                trim: true
            }

        }
    ]
})
articleSchema.method('transform', function() {
    var obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
  
    return obj;
  });
module.exports = mongoose.model('Article', articleSchema);