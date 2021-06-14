const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

class User {
  
  async create (req, res, next) {
    try {
      const { name, password, email } = req.body
      const userExists = await userModel.findOne({ email })

      if (userExists) return res.status(400).send({error: "User already exists."})

      const userId = uuidv4()
      
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      const user = await userModel.create({
        userId,
        name,
        email,
        password: hash,
        role: "employee"
      })
      res.status(201).json({
        userId: user.userId,
        name: user.name,
        email: user.email,
      })
    } catch (error) {
      res.status(400).json({error: error.message})
      next(error)
    }
  }

  async list (req, res, next) {
    try {
      const users = await userModel.find({})

      if (!users.length) return res.status(404).send({error: "User not found."})
    
      res.status(200).json(users.map(user => (
        {
          userId: user.userId,
          name: user.name,
          email: user.email
        }
      )))
    } catch (error) {
      res.status(400)
      next(error)
    }
  }


  async getByUserId (req, res, next) {
    try {
      const { userId } = req.params

      const user = await userModel.findOne({ userId })

      if (!user) return res.status(404).send({error: "User not found."})
    
      res.status(200).json({ userId: user.userId, name: user.name, email: user.email})
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async editByUserId (req, res, next) {
    try {
      const { userId } = req.params
      const { name, email } = req.body

      const user = await userModel.findOne({ userId })
      if (!user) return res.status(404).send({error: "User not found."})

      if (user.userId === userId) {
        const response = await userModel.findOneAndUpdate(userId, { name, email, password: user.password }, { new: true})
        res.status(200).json({ userId: response.userId, name: response.name, email: response.email })
      } else {
        res.status(400).send({error: "Unable to update user."})
      }
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async deleteByUserId (req, res, next) {
    try {
      const { userId } = req.params

      await userModel.deleteOne({ userId })
      res.status(200).send({message: "User deleted."})
    } catch (error) {
      res.status(400)
      next(error)
    }
  }
}

module.exports = new User