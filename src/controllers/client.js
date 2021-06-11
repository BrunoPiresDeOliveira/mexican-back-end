const Client = require('../services/client')
const authenticate = require('../config/auth')

module.exports = app => {
  app.post("/client", authenticate, async (req, res, next) => {
    Client.create(req, res, next)
  })

  app.get("/client", authenticate, async (req, res, next) => {
    Client.list(req, res, next)
  })

  app.get("/client/:clientId", authenticate, async (req, res, next) => {
    Client.getByClientId(req, res, next)
  })

  app.put("/client/:clientId", authenticate, async (req, res, next) => {
    Client.editByClientId(req, res, next)
  })

  app.delete("/client/:clientId", authenticate, async (req, res, next) => {
    Client.deleteByClientId(req, res, next)
  })
}