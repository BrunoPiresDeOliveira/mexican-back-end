const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Authentication {
  async login (req, res, next) {
    try {
      const { email, password } = req.body
      const user = await userModel.findOne({ email })

      if (!user) return res.status(401).send({error: "Incorrect email or password."})
      
      const validPassword = await bcrypt.compare(password, user.password)
      
      if (validPassword) {
        const token = jwt.sign({ userId: user.userId, name: user.name, role: user.role }, process.env.JWT_SECRET)
        const userSession = { userId: user.userId, name: user.name, role: user.role }
        res.json({ auth: true, token, user: userSession })
      } else {
        return res.status(401).send({error: "Incorrect email or password."})
      }
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

}

module.exports = new Authentication