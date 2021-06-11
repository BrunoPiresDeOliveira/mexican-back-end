const Order = require('../services/order')
const authenticate = require('../config/auth')

module.exports = app => {
  app.post("/order", authenticate, async (req, res, next) => {
    Order.create(req, res, next)
  })

  app.get("/order", authenticate, async (req, res, next) => {
    Order.list(req, res, next)
  })

  app.get("/order/:orderId", authenticate, async (req, res, next) => {
    Order.getByOrderId(req, res, next)
  })

  app.put("/order/:orderId", authenticate, async (req, res, next) => {
    Order.editByOrderId(req, res, next)
  })

  app.delete("/order/:orderId", authenticate, async (req, res, next) => {
    Order.deleteByOrderId(req, res, next)
  })
}