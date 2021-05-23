const express = require("express")
const Product = require("../models/product")
const Review = require("../models/review")
const router = express.Router()
const isLoggedIn = require("../middleware")

router.get("/", (req, res) => {
  res.send("<h1>Landing page !!!</h1><a href='/products'>View Products</a>")
})

// Display all  the products
router.get("/products", async (req, res) => {
  try{
    const products = await Product.find({})
    // console.log(req.session,"-----------")
    res.render("products/index", {products})
  }catch(e){
    console.log("Error : ", e)
    req.flash("error", "Something went wrong")
    res.redirect("/error")
  }
  
})

// Get the Form for product
router.get("/products/new", isLoggedIn, (req, res)=>{
  res.render("products/new")
})

// Create new product
router.post("/products",isLoggedIn, async (req,res)=>{
  try{
    await Product.create(req.body.product)
    req.flash("success","Product added successfully")
    // console.log(req.session,"-----------")
    res.redirect("/products")
  }catch(e){
    req.flash("error","There is a error")
    res.redirect("/products")
  }
  
})

// View Single Product
router.get("/products/:id",async (req, res)=>{
  try{
    const product = await Product.findById(req.params.id).populate("reviews")
    // console.log(product)
    res.render("products/show",{product})
  }catch(e){
    req.flash("error","There is a error")
    res.redirect("/products")
  }
  
})

// Get the Edit form
router.get("/products/:id/edit",isLoggedIn ,async (req,res)=>{
  try{
    const product = await Product.findById(req.params.id)
    res.render("products/edit",{product})
  }catch(e){
    req.flash("error","There is a error")
    res.redirect("/products")
  }
  
})

// Edit/Update product
router.patch("/products/:id",isLoggedIn ,async(req,res)=>{
  try{
    await Product.findByIdAndUpdate(req.params.id, req.body.product)
    req.flash("success","Post updated successfully")
    res.redirect(`/products/${req.params.id}`)
  }catch(e){
    req.flash("error","There is a error")
    res.redirect("/products")
  }

})

// Delete a particular Product
router.delete("/products/:id",isLoggedIn,async(req,res)=>{
  try{
    await Product.findByIdAndDelete(req.params.id)
    res.redirect("/products")
  }catch(e){
    req.flash("error","There is a error")
    res.redirect("/products")
  }
})

// Creating a New comment on products
router.post("/products/:id/review",isLoggedIn,async (req,res)=>{
  try{
    const product = await Product.findById(req.params.id)
    // const review = new Review(req.body)
    const review = new Review({
      user: req.user.username,
      ...req.body
    })
    product.reviews.push(review)
    // console.log(product.reviews)
    await review.save()
    await product.save()
    res.redirect(`/products/${req.params.id}`)
  }catch(e){
    req.flash("error","There is a error")
    res.redirect("/products")
  }
})

router.get("/error",(req,res)=>{
  res.status(404).render("error")
})

module.exports = router
