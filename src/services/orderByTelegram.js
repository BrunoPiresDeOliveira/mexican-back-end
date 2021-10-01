const orderByTelegram = require('../models/orderByTelegram')
const { v4: uuidv4 } = require('uuid')

class OrderByTelegram {

  async list (req, res, next) {
    try {
      const orders = await orderByTelegram.find({})

      if (!orders.length) return res.status(404).send({error: "Order not found."})
    
      res.status(200).json(orders.map(order => (
        {
          orderId: order.orderId,
          request: order.request,
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

      const order = await orderByTelegram.findOne({ orderId })

      if (!order) return res.status(404).send({error: "Order not found."})
    
      res.status(200).json({
        orderId: order.orderId,
        request: order.request,
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

      const order = await orderByTelegram.findOne({ orderId })

      if (!order) return res.status(404).send({error: "Order not found."})

      if (order.orderId === orderId) {
        const response = await orderByTelegram.findByIdAndUpdate(order._id, newOrder, {new: true})

        res.status(200).json({
          orderId: response.orderId,
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
      const orderExists = await orderByTelegram.findOne({ orderId })

      if (!orderExists) return res.status(400).send({error: "Order not found."})

      await orderByTelegram.deleteOne({ orderId })
      res.status(200).send({message: "Order deleted."})
    } catch (error) {
      res.status(400)
      next(error)
    }
  }
}

module.exports = new OrderByTelegram