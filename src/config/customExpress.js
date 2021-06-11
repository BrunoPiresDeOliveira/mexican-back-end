const express = require('express')
const cors = require('cors')
const consign = require('consign')
const db = require('./databaseConfig')

module.exports = () => {
  const app = express()
  app.use(express.json())
  app.use(cors())
  db()

  consign()
    .include('src/controllers')
    .into(app)
  
  return app
}