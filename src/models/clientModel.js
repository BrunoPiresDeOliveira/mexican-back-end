const mongoose = require('mongoose')

const Client = new mongoose.Schema ({
  clientId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
})

module.exports = mongoose.model("Client", Client)
