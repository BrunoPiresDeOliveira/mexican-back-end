const mongoose = require('mongoose')

const OrderItem = new mongoose.Schema ({
  orderItemId: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
})

module.exports = mongoose.model("OrderItem", OrderItem)
