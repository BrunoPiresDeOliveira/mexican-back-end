const mongoose = require('mongoose')

const Order = new mongoose.Schema ({
  orderId: {
    type: String,
    required: true
  },
  client: {
    type: Object,
    required: true
  },
  request: {
    type: Object,
    required: true
  },
})

module.exports = mongoose.model("Order", Order)
