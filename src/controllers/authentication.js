const Authentication = require('../services/authentication')

module.exports = app => {
  app.post("/login", async (req, res, next) => {
    Authentication.login(req, res, next)
  })

  app.get("/", async (req, res, next) => {
    res.json({message: "Funcionando"})
  })
}