const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    min: 0
  },
  img: {
    type: String,
    default: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2VhcmNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
  },
  desc: {
    type: String
  },
  reviews: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Review"
    }
  ]
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product
