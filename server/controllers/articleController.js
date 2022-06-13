const router = require("express").Router();
const Blog = require("../models/Blog");
const Article = require("../models/Article");
const blogService = require("../services/blogService");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    let article = [];
    p = await Article.find();
    for (let i = 0; i < p.length; i++) {
      article.push(p[i].transform());
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/specificart/:id', async (req, res) => {
  try {
      let article = await (await Article.findById(req.params.id)).toJSON()
      let owner = await (await User.findById(article.articleowner)).toJSON()
      let user = await (await User.findById(req.user)).toJSON()
      let jsonRes = {
          ...article,
          name: owner.name,
          phoneNumber: owner.phoneNumber,
          email: owner.email,
          avatar: owner.avatar,
          ownerId: owner._id,
      }
      if (req.user) {
          let user = await User.findById(req.user._id)
          jsonRes.isowner = Boolean(req.user._id == article.articleowner);
 
      }
      res.status(200).json(jsonRes);
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
});
router.post("/create", async (req, res) => {
  let { title, image, description, tags, blogs } = req.body;
  try {
    let errors = [];
    let blog = [];
    if (title.length < 3 || title.length > 11)
      errors.push(
        "name should be at least 3 characters long and max 10 characters long; "
      );
    if (errors.length >= 1) throw { message: [errors] };
    if (description.length < 10)
      errors.push(
        "Description should be at least 10 characters long"
      );
    if (!image.includes("image"))
      errors.push("The uploaded file should be an image; ");
    p = await Blog.find();
    for (let i = 0; i < p.length; i++) {
      console.log(blogs[0].id)
      if(p[i]._id == blogs[0].id)
      blog.push(p[i]);
      
    }
    let compressedImg = await blogService.uploadImage(image);
    let article = new Article({
      title,
      description,
      tags,
      image: compressedImg,
      addedAt: new Date(),
      blogr:blog[0].title, 
      articleowner: req.user._id,
    });

    await article.save();
    await blogService.userCollectionUpdate(req.user._id, article);
    await blogService.blogCollectionUpdate(blog[0]._id, article);

    res.status(201).json({ article });
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: err.message });
  }
});
module.exports = router;
