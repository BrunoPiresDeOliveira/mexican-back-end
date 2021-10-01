const OrderByTelegram = require('../services/orderByTelegram')
const authenticate = require('../config/auth')

module.exports = app => {
  app.post("/orderByTelegram", authenticate, async (req, res, next) => {
    OrderByTelegram.create(req, res, next)
  })

  app.get("/orderByTelegram", authenticate, async (req, res, next) => {
    OrderByTelegram.list(req, res, next)
  })

  app.get("/orderByTelegram/:orderId", authenticate, async (req, res, next) => {
    OrderByTelegram.getByOrderId(req, res, next)
  })

  app.get("/orderByTelegram/:orderId/status", async (req, res, next) => {
    OrderByTelegram.getByOrderIdStatus(req, res, next)
  })

  app.put("/orderByTelegram/:orderId", authenticate, async (req, res, next) => {
    OrderByTelegram.editByOrderId(req, res, next)
  })

  app.delete("/orderByTelegram/:orderId", authenticate, async (req, res, next) => {
    OrderByTelegram.deleteByOrderId(req, res, next)
  })
}