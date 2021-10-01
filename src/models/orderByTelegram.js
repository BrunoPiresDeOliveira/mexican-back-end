const mongoose = require('mongoose')

const OrderByTelegram = new mongoose.Schema ({
  orderId: {
    type: String,
    required: true
  },
  request: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("OrderByTelegram", OrderByTelegram)
