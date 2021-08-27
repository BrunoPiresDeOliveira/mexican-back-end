const mongoose = require('mongoose')

const User = new mongoose.Schema ({
  userId: {
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
  address: {
    type: Object,
    required: true
  },
  role: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("User", User)
