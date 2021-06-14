const mongoose = require('mongoose')

const Order = new mongoose.Schema ({
  orderId: {
    type: String,
    required: true
  },
  orderCreationDate: {
    type: String,
    required: true
  },
  deliveryDate: {
    type: String,
    required: true
  },
  orderItems: {
    type: Array,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  formOfPayment: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  clientName: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Order", Order)
