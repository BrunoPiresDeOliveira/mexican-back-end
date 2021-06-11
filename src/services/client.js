const clientModel = require('../models/clientModel')
const { v4: uuidv4 } = require('uuid')

class Client {
  async create (req, res, next) {
    try {
      const { name, email, cnpj, phone } = req.body
      const clientExists = await clientModel.findOne({ cnpj })

      if (clientExists) return res.status(400).send({error: "Client already exists."})
      
      const clientId = uuidv4()

      const client = await clientModel.create({
        clientId,
        name,
        email,
        cnpj,
        phone,
      })
      res.status(201).send({
        clientId: client.clientId,
        name: client.name
      })
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async list (req, res, next) {
    try {
      const clients = await clientModel.find({})

      if (!clients.length) return res.status(404).send({error: "Client not found."})
    
      res.status(200).json(clients.map(client => (
        {
          _id: client._id,
          clientId: client.clientId,
          name: client.name,
          email: client.email,
          cnpj: client.cnpj,
          phone: client.phone,
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
        name: client.name,
        email: client.email,
        cnpj: client.cnpj,
        phone: client.phone,
      })
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async editByClientId (req, res, next) {
    try {
      const { clientId } = req.params
      const newClient = req.body

      const client = await clientModel.findOne({ clientId })

      if (!client) return res.status(404).send({error: "Client not found."})
      
      if (client.clientId === clientId) {
        const response = await clientModel.findByIdAndUpdate(client._id, newClient, {new: true})
        res.status(200).json({ 
          clientId: response.clientId, 
          name: response.name,
          email: response.email,
          cnpj: response.cnpj,
          phone: response.phone,
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