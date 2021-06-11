const productModel = require('../models/productModel')
const { v4: uuidv4 } = require('uuid')

class Product {
  async create (req, res, next) {
    try {
      const { name, price, quantity, size } = req.body
      const productExists = await productModel.findOne({ name })

      if (productExists) return res.status(400).send({error: "Product already exists."})
      
      const productId = uuidv4()

      const product = await productModel.create({
        productId,
        name,
        price,
        quantity,
        size
      })
      res.status(201).send({
        productId: product.productId,
        name: product.name
      })
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async list (req, res, next) {
    try {
      const products = await productModel.find({})

      if (!products.length) return res.status(404).send({error: "Product not found."})
    
      res.status(200).json(products.map(product => (
        {
          productId: product.productId,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          size: product.size,
        }
      )))
    } catch (error) {
      res.status(400)
      next(error)
    }
  }


  async getByProductId (req, res, next) {
    try {
      const { productId } = req.params

      const product = await productModel.findOne({ productId })

      if (!product) return res.status(404).send({error: "Product not found."})
    
      res.status(200).json({ 
        productId: product.productId, 
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        size: product.size,
      })
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async editByProductId (req, res, next) {
    try {
      const { productId } = req.params
      const { name, price, quantity, size } = req.body

      const product = await productModel.findOne({ productId })

      if (!product) return res.status(404).send({error: "Product not found."})

      if (product.productId === productId) {
        const response = await productModel.findOneAndUpdate(productId, { name, price, quantity, size }, { new: true})
        res.status(200).json({ 
          productId: response.productId, 
          name: response.name,
          price: response.price,
          quantity: response.quantity,
          size: response.size,
        })
      } else {
        res.status(400).send({error: "Unable to update product."})
      }
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async deleteByProductId (req, res, next) {
    try {
      const { productId } = req.params

      await productModel.deleteOne({ productId })
      res.status(200).send({message: "Product deleted."})
    } catch (error) {
      res.status(400)
      next(error)
    }
  }
}

module.exports = new Product