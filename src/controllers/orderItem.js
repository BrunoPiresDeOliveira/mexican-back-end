const OrderItem = require('../services/orderItem')
const authenticate = require('../config/auth')

module.exports = app => {
  app.post("/orderItem", authenticate, async (req, res, next) => {
    OrderItem.create(req, res, next)
  })

  app.get("/orderItem", authenticate, async (req, res, next) => {
    OrderItem.list(req, res, next)
  })

  app.get("/orderItem/:orderItemId", authenticate, async (req, res, next) => {
    OrderItem.getByOrderItemId(req, res, next)
  })

  app.put("/orderItem/:orderItemId", authenticate, async (req, res, next) => {
    OrderItem.editByOrderItemId(req, res, next)
  })

  app.delete("/orderItem/:orderItemId", authenticate, async (req, res, next) => {
    OrderItem.deleteByOrderItemId(req, res, next)
  })
}