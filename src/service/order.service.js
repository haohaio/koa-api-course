

const Order = require('../model/order.model')

class OrderService {
  async createOrder(order) {
    const res = await Order.create(order)
    return res.dataValues
  }
}

module.exports = new OrderService()
