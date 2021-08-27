const mongoose = require('mongoose')

const Client = new mongoose.Schema ({
  clientId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
})

module.exports = mongoose.model("Client", Client)
