const orderModel = require('../models/orderModel')
const clientModel = require('../models/clientModel')
const { v4: uuidv4 } = require('uuid')

function validateDate(d){
  var data = d;
  data = data.replace(/\//g, "/");
  var data_array = data.split("/");
  var dia = data_array[2];
  var mes = data_array[1];
  var ano = data_array[0];

  if(data_array[0].length !== 4){
     dia = data_array[0];
     mes = data_array[1];
     ano = data_array[2];
  }

  var hoje = new Date();
  var d1 = hoje.getDate();
  var m1 = hoje.getMonth()+1;
  var a1 = hoje.getFullYear();

  d1 = new Date(a1, m1, d1);
  var d2 = new Date(ano, mes, dia);

  var diff = d2.getTime() - d1.getTime();
  diff = diff / (1000 * 60 * 60 * 24);
  
  if(diff < 0){
    return false
  } else {
    return true
  }
}

class Order {
  async create (req, res, next) {
    try {
      const { deliveryDate, orderItems, formOfPayment, clientId, value } = req.body

      if (!validateDate(deliveryDate)) throw({ _message: "A data de entrega não pode ser anterior ao dia atual."})
      

      const client = await clientModel.findOne({ clientId })
      const status = "Aguardando resposta"
      
      const orderId = uuidv4()

      let data = new Date();
      let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
      let americanDate = data2.toISOString().replace(/\.\d{3}Z$/, '');
      let americanDateSplited = americanDate.split('T')
      let brazilDate = americanDateSplited[0].split('-').reverse().join('/')
      let orderCreationDate = `${brazilDate}`

      const order = await orderModel.create({
        orderId,
        orderCreationDate,
        deliveryDate,
        orderItems,
        status,
        formOfPayment,
        value,
        clientId,
        clientName: client.name
      })

      res.status(201).send({
        orderId: order.orderId,
        orderCreationDate: order.orderCreationDate,
        deliveryDate: order.deliveryDate,
        orderItems: order.orderItems,
        status: order.status,
        formOfPayment: order.formOfPayment,
        value: order.value,
        clientId: order.clientId,
        clientName: order.clientName,
      })

      res.status(200).send()

    } catch (error) {
      if(error._message === 'Order validation failed') {
        error._message = "Há campos em branco"
      }
      res.status(400).json({error: error._message})
      next(error)
    }
  }

  async list (req, res, next) {
    try {
      const orders = await orderModel.find({})

      if (!orders.length) return res.status(404).send({error: "Order not found."})
    
      res.status(200).json(orders.map(order => (
        {
          orderId: order.orderId,
          orderCreationDate: order.orderCreationDate,
          deliveryDate: order.deliveryDate,
          orderItems: order.orderItems,
          customization: order.customization,
          status: order.status,
          formOfPayment: order.formOfPayment,
          clientId: order.clientId,
          clientName: order.clientName
        }
      )))
    } catch (error) {
      res.status(400)
      next(error)
    }
  }


  async getByOrderId (req, res, next) {
    try {
      const { orderId } = req.params

      const order = await orderModel.findOne({ orderId })

      if (!order) return res.status(404).send({error: "Order not found."})
    
      res.status(200).json({ 
        orderId: order.orderId, 
        orderCreationDate: order.orderCreationDate,
        deliveryDate: order.deliveryDate,
        orderItems: order.orderItems,
        status: order.status,
        formOfPayment: order.formOfPayment,
        clientId: order.clientId,
        clientName: order.clientName,
        value: order.value
      })
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async getByOrderIdStatus (req, res, next) {
    try {
      const { orderId } = req.params

      const order = await orderModel.findOne({ orderId })

      if (!order) return res.status(404).send({error: "Order not found."})
    
      res.status(200).json({ 
        status: order.status,
      })
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async editByOrderId (req, res, next) {
    try {
      const { orderId } = req.params
      const newOrder = req.body

      const order = await orderModel.findOne({ orderId })

      if (!order) return res.status(404).send({error: "Order not found."})

      if (order.orderId === orderId) {
        const response = await orderModel.findByIdAndUpdate(order._id, newOrder, {new: true})

        res.status(200).json({
          orderId: response.orderId,
          orderCreationDate: response.orderCreationDate,
          deliveryDate: response.deliveryDate,
          orderItems: response.orderItems,
          customization: response.customization,
          status: response.status,
          formOfPayment: response.formOfPayment,
          clientId: response.clientId
        })
      } else {
        res.status(400).send({error: "Unable to update order."})
      }
    } catch (error) {
      res.status(400)
      next(error)
    }
  }

  async deleteByOrderId (req, res, next) {
    try {
      const { orderId } = req.params

      await orderModel.deleteOne({ orderId })
      res.status(200).send({message: "Order deleted."})
    } catch (error) {
      res.status(400)
      next(error)
    }
  }
}

module.exports = new Order