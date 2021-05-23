const express = require("express")
const router = express.Router()
const User = require("../models/users")
const Products = require("../models/product")
const isLoggedIn = require("../middleware")
const Product = require("../models/product")

router.get("/cart/:userId",isLoggedIn ,async(req,res)=>{
    
    const user = await User.findById(req.params.userId).populate("cart")
    // console.log(user.cart)
    res.render("cart/showCart", {cart: user.cart})
})

router.post("/cart/:productId", isLoggedIn ,async (req,res)=>{
    try{
        const product = await Product.findById(req.params.productId)
        const user = req.user
        user.cart.push(product._id)
        await user.save()
        req.flash("success","Added to cart successfully")
        res.redirect(`/products/${req.params.productId}`)
    }catch(e){
        req.flash("error","There is a error while adding product to cart")
        res.redirect("/products")
    }
})

router.delete("/cart/:productId/user/:userId",isLoggedIn,async(req,res)=>{
    const {userId, productId} = req.params
    await User.findByIdAndUpdate(userId,{$pull:{cart: productId}})
    res.redirect(`/cart/${userId}`)
})

module.exports = router