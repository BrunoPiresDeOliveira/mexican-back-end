const mongoose = require('mongoose')

const Product = new mongoose.Schema ({
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
})

module.exports = mongoose.model("Product", Product)
