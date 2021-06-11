const dotenv = require('dotenv')
const mongoose = require('mongoose')

module.exports = () => {
  dotenv.config()

  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,    
    useUnifiedTopology: true  
  },  () => console.log("Connected to the database!"))
}