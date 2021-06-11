const User = require('../services/user')
const authenticate = require('../config/auth')

module.exports = app => {
  app.post("/user", async (req, res, next) => {
    User.create(req, res, next)
  })

  app.get("/user", authenticate, async (req, res, next) => {
    User.list(req, res, next)
  })

  app.get("/user/:userId", authenticate, async (req, res, next) => {
    User.getByUserId(req, res, next)
  })

  app.put("/user/:userId", authenticate, async (req, res, next) => {
    User.editByUserId(req, res, next)
  })

  app.delete("/user/:userId", authenticate, async (req, res, next) => {
    User.deleteByUserId(req, res, next)
  })
}