const Blog = require("../models/Blog")

exports.home = (req,res)=>{
    res.send("<a href='/blog'>View Blogs</a>")
}

exports.allBlogs = async(req,res)=>{
    const blogs = await Blog.find()
    res.render("blog/index",{blogs})
}

exports.createForm = (req,res)=>{
    res.render("blog/new")
}

exports.createBlog = async(req,res)=>{
    await Blog.create(req.body)
    res.redirect("/blog")
}

exports.singleBlog = async(req,res)=>{
    const blog = await Blog.findById({_id:req.params.id})
    res.render("blog/single",{blog})
}

exports.editForm = async(req,res)=>{
    const blog = await Blog.findById({_id: req.params.id}) 
    res.render("blog/edit",{blog})
}

exports.updateBlog = async(req,res)=>{
    await Blog.findByIdAndUpdate({_id:req.params.id},req.body)
    res.redirect(`/blog/${req.params.id}`)
}

exports.deleteBlog = async(req,res)=>{
    await Blog.deleteOne({_id:req.params.id})
    res.redirect("/blog")
}
