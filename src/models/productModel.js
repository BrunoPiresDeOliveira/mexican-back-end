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
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("Product", Product)
