const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    title: {
        type: String,
        trim: true,
        required: 'please fill the title of the blog'
    },
    image: {
        type: String
    },
    sujet: {
        type: String,
        trim: true,
    },
    addedAt: {
        type: Date,
        required: true,
    },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }]
})
blogSchema.method('transform', function() {
    var obj = this.toObject();
  
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
  
    return obj;
  });
  
module.exports = mongoose.model('Blog', blogSchema);