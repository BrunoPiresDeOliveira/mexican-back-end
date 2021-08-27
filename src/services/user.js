const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

class User {
  
  async create (req, res, next) {
    try {
      const { email, password, name, address } = req.body
      const userExists = await userModel.findOne({ email })

      if (userExists) return res.status(400).send({error: "User already exists."})

      const userId = uuidv4()
      
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      const user = await userModel.create({
        userId,
        email,
        password: hash,
        name,
        address,
        role: "owner"
      })
      res.status(201).json({
        userId: user.userId,
        name: user.name,
        email: user.email,
        address: user.address,
        role: "owner"
      })
    } catch (error) {
      res.status(400).json({error: error.message})
      next(error)
    }
  }

  async list (req, res, next) {
    try {
      const users = await userModel.find({})

      res.status(200).json(users.map(user => (
        {
          userId: user.userId,
          email: user.email,
          name: user.name,
          address: user.address,
          role: "owner"
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
    
      res.status(200).json(
        {
          userId: user.userId,
          email: user.email,
          name: user.name,
          address: user.address,
          role: "owner"
        }
      )
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async editByUserId (req, res, next) {
    try {
      const { userId } = req.params
      const { email, name, address } = req.body

      const user = await userModel.findOne({ userId })
      if (!user) return res.status(404).send({error: "User not found."})

      if (user.userId === userId) {
        const userEdited = await userModel.findOneAndUpdate(userId, { email, name, password: user.password, address }, { new: true})
        res.status(200).json({ userId: userEdited.userId, email: userEdited.email, name: userEdited.name, address: userEdited.address })
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