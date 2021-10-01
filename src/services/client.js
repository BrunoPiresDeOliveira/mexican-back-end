const clientModel = require('../models/clientModel')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

class Client {
  async create (req, res, next) {
    try {
      const { email, password, name, cpf, phone, address } = req.body
      const clientExists = await clientModel.findOne({ email })

      if (clientExists) return res.status(400).send({error: "Client already exists."})
      
      const clientId = uuidv4()

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      const client = await clientModel.create({
        clientId,
        email,
        password: hash,
        name,
        cpf,
        phone,
        phone,
        address,
        role: "client"
      })
      res.status(201).send({
        clientId: client.clientId,
        email: client.email,
        name: client.name,
        cpf: client.cpf,
        phone: client.phone,
        address: client.address,
      })
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async list (req, res, next) {
    try {
      const clients = await clientModel.find({})
    
      res.status(200).json(clients.map(client => (
        {
          clientId: client.clientId,
          email: client.email,
          name: client.name,
          cpf: client.cpf,
          phone: client.phone,
          address: client.address,
        }
      )))
    } catch (error) {
      res.status(400)
      next(error)
    }
  }


  async getByClientId (req, res, next) {
    try {
      const { clientId } = req.params

      const client = await clientModel.findOne({ clientId })

      if (!client) return res.status(404).send({error: "Client not found."})
    
      res.status(200).json({ 
        clientId: client.clientId, 
        email: client.email,
        name: client.name,
        cpf: client.cpf,
        phone: client.phone,
        address: client.address,
      })
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async editByClientId (req, res, next) {
    try {
      const { clientId } = req.params
      const { email, name, cpf, phone, address } = req.body

      const client = await clientModel.findOne({ clientId })
      if (!client) return res.status(404).send({error: "Client not found."})
      
      if (client.clientId === clientId) {
        const response = await clientModel.findOneAndUpdate(clientId, { email, password: client.password, name, cpf, phone, address }, {new: true})
        res.status(200).json({ 
          clientId: response.clientId, 
          name: response.name,
          email: response.email,
          name: response.name,
          cpf: response.cpf,
          phone: response.phone,
          address: response.address,
        })
      } else {
        res.status(400).send({error: "Unable to update client."})
      }
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async deleteByClientId (req, res, next) {
    try {
      const { clientId } = req.params

      await clientModel.deleteOne({ clientId })
      res.status(200).send({message: "Client deleted."})
    } catch (error) {
      res.status(400)
      next(error)
    }
  }
}

module.exports = new Client