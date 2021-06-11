const Product = require('../services/product')
const authenticate = require('../config/auth')

module.exports = app => {
  app.post("/product", authenticate, async (req, res, next) => {
    Product.create(req, res, next)
  })

  app.get("/product", authenticate, async (req, res, next) => {
    Product.list(req, res, next)
  })

  app.get("/product/:productId", authenticate, async (req, res, next) => {
    Product.getByProductId(req, res, next)
  })

  app.put("/product/:productId", authenticate, async (req, res, next) => {
    Product.editByProductId(req, res, next)
  })

  app.delete("/product/:productId", authenticate, async (req, res, next) => {
    Product.deleteByProductId(req, res, next)
  })
}