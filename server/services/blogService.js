const { cloudinary } = require('../config/cloudinary');
const { CLOUDINARY_STORAGE } = require('../config/config');
const Datauri = require('datauri');
const Blog = require('../models/Blog');
const User = require('../models/User');

async function uploadImage(image) {
 /*    var dUri = new Datauri();
dUri.format(path.extname(image), req.file.buffer) */
    const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: CLOUDINARY_STORAGE,
    }, { quality: "auto" });

    let imageUrl = uploadResponse.url;
    let index = (imageUrl.indexOf('upload/')) + 6;

    let compressedImg = imageUrl
        .substring(0, index) +
        "/c_fit,q_auto,f_auto,w_800" +
        imageUrl.substring(index);

    return compressedImg;
}
async function getBlogById(blogId) {
    return await Blog.findById(blogId);
}

async function edit(blogId, blogData) {
    return await  Blog.updateOne({ _id: blogId }, { $set: { ...blogData } });
}
async function userCollectionUpdate(userId, article) {
    return await User.updateOne({ _id: userId }, { $push: { createdArticle: article } });
}

async function blogCollectionUpdate(blogId, article) {
    return await Blog.updateOne({ _id: blogId }, { $push: { articles: article } });
}


module.exports = {
    uploadImage,
    edit,
    getBlogById,
    userCollectionUpdate,
    blogCollectionUpdate,

}
