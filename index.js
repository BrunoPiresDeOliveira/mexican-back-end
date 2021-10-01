const customExpress = require('./src/config/customExpress')
const bot = require('./src/config/telegramBot')

const app = customExpress()
bot()

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening at http://localhost:${process.env.SERVER_PORT}`)
})
