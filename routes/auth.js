const express = require("express")
const passport = require("passport")
const router = express.Router()
const User = require(("../models/users"))

// router.get("/testUserRegistration", async (req,res)=>{
//     const user = {username:"test", email:"test@test.com"}
//     const createdUser = await User.register(user, "password123")
//     res.send(createdUser)
// })

// Get the sign up form
router.get("/register",(req,res)=>{
    res.render('auth/signup')
})

// Register User
router.post("/register", async (req,res)=>{
    try{
        const user = {username: req.body.username, email: req.body.email}
        const createdUser = await User.register(user, req.body.password)
        console.log(createdUser)
        req.flash("success","Registration Successful")
        res.redirect("products")        
    }catch(e){
        req.flash("error", e.message)
        res.redirect("/register")       
    }
})

// Get the login form
router.get("/login",(req,res)=>{
    res.render("auth/login")
})

// User Login
router.post("/login",passport.authenticate("local",{
    // successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}) ,async(req,res)=>{
    req.flash('success',"Welcome Back!")
    // console.log(req.user)
    res.redirect("/products")
})

// Logout
router.get("/logout", (req,res)=>{
    req.logout()
    req.flash("success", "Successfully Logged Out")
    res.redirect("/products")
})

module.exports = router
