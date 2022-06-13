const router = require("express").Router();
const Blog = require("../models/Blog");
const blogService = require('../services/blogService');

router.get("/", async (req, res) => {
  try {
    let blog = [];
    p = await Blog.find();
    for (let i = 0; i < p.length; i++) {
      blog.push(p[i].transform());
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/getBlogById/:id', async (req, res) => {
  try {
   let blog =[];
    p = await Blog.find();
    for (let i = 0; i < p.length; i++) {
      for (let j = 0; j < p[i].articles.length; j++) {
        if(p[i].articles[j].toString() == req.params.id.toString()){
        blog.push(p[i]);}
      }
    }
      res.status(200).json(blog[0]);
  } catch (error) {
      res.status(500).json({ error });
  }
});

router.post("/create", async (req, res) => {
  let { title, sujet } = req.body;
  try {
    let errors = [];
    if (title.length < 3 || title.length > 11)
      errors.push(
        "name should be at least 3 characters long and max 10 characters long; "
      );
    if (errors.length >= 1) throw { message: [errors] };

    let blog = new Blog({
      title,
      addedAt: new Date(),
      sujet,
    });

    await blog.save();

    res.status(201).json({ blog });
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: err.message });
  }
});
///// Partie Admin ////
router.delete("/delete/:id", async (req, res) => {
  let { id } = req.body;
  try {
    let blog = await Blog.findByIdAndDelete(req.params.id);

    res.status(201).json({ blog });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let blog = await blogService.getBlogById(req.params.id);
    r = blog.transform();
    res.status(200).json(r);
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.put("/:id", async (req, res) => {
  let { title, sujet } = req.body;
  try {
    let errors = [];
    if (title.length < 3 || title.length > 11)
      errors.push(
        "name should be at least 3 characters long and max 10 characters long; "
      );
    if (errors.length >= 1) throw { message: [errors] };


    await blogService.edit(req.params.id, { title, sujet });

    res.status(201).json({  message: "Updated!"  });
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: err.message });
  }
});
module.exports = router;
