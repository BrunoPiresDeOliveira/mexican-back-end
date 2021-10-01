const productModel = require('../models/productModel')
const { v4: uuidv4 } = require('uuid')
const TelegramBot = require('node-telegram-bot-api');

module.exports = () => {
  const bot = new TelegramBot(process.env.BOT_TELEGRAM_TOKEN, {polling: true})

  bot.on("message", async (msg) => {
    if(msg.text === "Ver cardápio") {
      const products = await productModel.find({})
      const list = []
      console.log(products)
      for (const product of products) {
        list.push(`
- ${product.name}
${product.description}
${product.ingredients}
${product.price} R$
`)
      }

      bot.sendMessage(msg.chat.id, list.join('').toString());
    }

    else if(msg.text === "Contato para fazer pedido") {
      bot.sendMessage(msg.chat.id, `Entre em contato com a gente pelo Telefone, Telegram ou WhatsApp através do número (11) 9 9999-9999! \nHorário de funcionamento: \nDas 18:00h às 02:00h de terça-feira á domingo.`);
    }
    
    else if(msg.text === "Horário de funcionamento") {
      bot.sendMessage(msg.chat.id, `Horário de funcionamento: \nDas 18:00h às 02:00h de terça-feira á domingo.`);
    }
    
    else {
      bot.sendMessage(msg.chat.id, `Olá ${msg.from.first_name}, em que eu posso te ajudar?`, {
        "reply_markup": {
            "keyboard": [["Ver cardápio"],   ["Horário de funcionamento"], ["Contato para fazer pedido"]]
            }
      });
    }
  })

  console.log('Connected to the MexicanFoodBot')
  return bot
}