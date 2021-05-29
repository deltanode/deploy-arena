const express = require("express")
const blogController = require("../controllers/blogController")
const Blog = require("../models/Blog")

const router = express.Router()

router.get("/",blogController.home)
router.get("/blog",blogController.allBlogs)
router.get("/blog/new",blogController.createForm)
router.post("/blog",blogController.createBlog)
router.get("/blog/:id",blogController.singleBlog)
router.get("/blog/:id/edit",blogController.editForm)
router.patch("/blog/:id",blogController.updateBlog)
router.delete("/blog/:id",blogController.deleteBlog)

module.exports = router