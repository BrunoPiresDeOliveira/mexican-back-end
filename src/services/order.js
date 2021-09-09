const orderModel = require('../models/orderModel')
const clientModel = require('../models/clientModel')
const productModel = require('../models/productModel')
const { v4: uuidv4 } = require('uuid')

class Order {
  async create (req, res, next) {
    try {
      const { clientId, request  } = req.body

      const { name, phone, address } = await clientModel.findOne({ clientId })
      
      const orderId = uuidv4()
      
      const formatedRequest = await Promise.all(request.products.map(async (productId) => {
        const product = await productModel.findOne({ productId })
        return product
      }))

      let value = 0
      for (let product of formatedRequest) {
        value = value + product.price;
      }

      const order = await orderModel.create({
        orderId,
        client: {
          clientId,
          name,
          phone,
          address,
        },
        request: {
          products: formatedRequest,
          observation: request.observation,
          amount: value,
        }
      })

      res.status(201).send({
        orderId,
        client: order.client,
        request: order.request,
        amount: order.amount
      })
    } catch (error) {
      if(error._message === 'Order validation failed') {
        error._message = "Há campos em branco"
      }
      res.status(400).json({error: error._message})
      next(error)
    }
  }

  async list (req, res, next) {
    try {
      const orders = await orderModel.find({})

      if (!orders.length) return res.status(404).send({error: "Order not found."})
    
      res.status(200).json(orders.map(order => (
        {
          orderId: order.orderId,
          client: order.client,
          request: order.request,
          amount: order.amount,
        }
      )))
    } catch (error) {
      res.status(400)
      next(error)
    }
  }


  async getByOrderId (req, res, next) {
    try {
      const { orderId } = req.params

      const order = await orderModel.findOne({ orderId })

      if (!order) return res.status(404).send({error: "Order not found."})
    
      res.status(200).json({
        orderId: order.orderId,
        client: order.client,
        request: order.request,
        amount: order.amount,
      })
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async editByOrderId (req, res, next) {
    try {
      const { orderId } = req.params
      const newOrder = req.body

      const order = await orderModel.findOne({ orderId })

      if (!order) return res.status(404).send({error: "Order not found."})

      if (order.orderId === orderId) {
        const response = await orderModel.findByIdAndUpdate(order._id, newOrder, {new: true})

        res.status(200).json({
          orderId: response.orderId,
          client: response.client,
          request: response.request,
        })
      } else {
        res.status(400).send({error: "Unable to update order."})
      }
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async deleteByOrderId (req, res, next) {
    try {
      const { orderId } = req.params
      const orderExists = await orderModel.findOne({ orderId })

      if (!orderExists) return res.status(400).send({error: "Order not found."})

      await orderModel.deleteOne({ orderId })
      res.status(200).send({message: "Order deleted."})
    } catch (error) {
      res.status(400)
      next(error)
    }
  }
}

module.exports = new Order