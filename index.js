const customExpress = require('./src/config/customExpress')

const app = customExpress()

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening at http://localhost:${process.env.SERVER_PORT}`)
})
