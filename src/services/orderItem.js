const orderItemModel = require('../models/orderItemModel')
const productModel = require('../models/productModel')

const { v4: uuidv4 } = require('uuid')

class OrderItem {
  async create (req, res, next) {
    try {
      const { orderId, productId, quantity } = req.body
      const orderItemId = uuidv4()

      const product = await productModel.findOne({ productId })

      const orderItem = await orderItemModel.create({
        orderItemId,
        orderId,
        productId,
        quantity,
        price: (quantity * product.price)
      })

      res.status(201).send({
        orderItemId: orderItem.orderItemId,
        orderId: orderItem.orderId,
        productId: orderItem.productId,
        quantity: orderItem.quantity,
        productName: product.name,
        productPrice: product.price,
        price: orderItem.price
      })

      res.status(201).send()
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async list (req, res, next) {
    try {
      const orderItems = await orderItemModel.find({})

      if (!orderItems.length) return res.status(404).send({error: "OrderItem not found."})
    
      res.status(200).json(orderItems.map(orderItem => (
        {
          orderItemId: orderItem.orderItemId,
          orderId: orderItem.orderId,
          productId: orderItem.productId,
          quantity: orderItem.quantity,
          price: orderItem.price
        }
      )))
    } catch (error) {
      res.status(400)
      next(error)
    }
  }


  async getByOrderItemId (req, res, next) {
    try {
      const { orderItemId } = req.params

      const orderItem = await orderItemModel.findOne({ orderItemId })

      if (!orderItem) return res.status(404).send({error: "OrderItem not found."})

      const product = await productModel.findOne({ productId: orderItem.productId })

      res.status(200).json({ 
        orderItemId: orderItem.orderItemId,
        orderId: orderItem.orderId,
        productId: orderItem.productId,
        quantity: orderItem.quantity,
        productName: product.name,
        productPrice: product.price,
        price: orderItem.price
      })
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async editByOrderItemId (req, res, next) {
    try {
      const { orderItemId } = req.params
      const { orderId, productId, quantity } = req.body

      const orderItem = await orderItemModel.findOne({ orderItemId })

      const product = await productModel.findOne({ productId })

      if (!orderItem) return res.status(404).send({error: "OrderItem not found."})

      if (orderItem.orderItemId === orderItemId) {
        const response = await orderItemModel.findOneAndUpdate(orderItemId, { orderId, productId, quantity, price: (quantity * product.price) }, { new: true})
        res.status(200).json({ 
          orderItemId: response.orderItemId, 
          orderId: orderItem.orderId,
          productId: orderItem.productId,
          quantity: orderItem.quantity,
          productName: product.name,
          productPrice: product.price,
          price: (quantity * product.price)
        })
      } else {
        res.status(400).send({error: "Unable to update orderItem."})
      }
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async deleteByOrderItemId (req, res, next) {
    try {
      const { orderItemId } = req.params

      await orderItemModel.deleteOne({ orderItemId })
      res.status(200).send({message: "OrderItem deleted."})
    } catch (error) {
      res.status(400)
      next(error)
    }
  }
}

module.exports = new OrderItem