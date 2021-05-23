const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const Product = require("./product")

const userSchema = new mongoose.Schema({
  // username, password & salt will be added by [passport-local-mongoose]
  email:{
      type: String,
      unique: true,
      require: true
  },
  cart:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }]  
})

// It will static methods (like authenticate, serializeUser), username, password & salt
userSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", userSchema)

module.exports = User