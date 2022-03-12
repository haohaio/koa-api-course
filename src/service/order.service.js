const Order = require('../model/order.model')
const Address = require('../model/addr.model')

class OrderService {
  async createOrder(order) {
    const res = await Order.create(order)
    return res.dataValues
  }

  async getAllOrders(userId, pageNum, pageSize, status) {
    const offset = (pageNum - 1) * pageSize
    // const rows = await Goods.findAll({ offset, limit: +pageSize })

    const { count, rows } = await Order.findAndCountAll({
      offset,
      limit: +pageSize,
      attributes: [
        'id',
        'userId',
        'total',
        'goodsInfo',
        'orderNumber',
        'status',
      ],
      where: { userId, status },
      include: {
        model: Address,
        as: 'addressInfo',
        attributes: ['id', 'address', 'phone', 'consignee'],
      },
    })
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows
    }
  }

  async updateOrder(id, status) {
    const order = await Order.findByPk(id)
    order.status = status
    return await order.save()
  }
}

module.exports = new OrderService()
