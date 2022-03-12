const {
  createOrder,
  getAllOrders,
  updateOrder,
} = require('../service/order.service')

class OrderController {
  async create(ctx) {
    try {
      const userId = ctx.state.user.id
      const { addressId, goodsInfo, total } = ctx.request.body

      const orderNumber = 'HH' + Date.now()
      const res = await createOrder({
        userId,
        addressId,
        goodsInfo,
        total,
        orderNumber,
      })

      ctx.body = {
        code: 0,
        message: '创建订单成功',
        result: res,
      }
    } catch (error) {
      console.error('创建订单失败', error)
    }
  }

  async getAll(ctx) {
    const userId = ctx.state.user.id
    const { pageNum = 1, pageSize = 10, status = 0 } = ctx.request.query
    const res = await getAllOrders(userId, pageNum, pageSize, status)
    ctx.body = {
      code: 0,
      message: '获取订单列表成功',
      result: res,
    }
  }

  async updateStatus(ctx) {
    try {
      const id = ctx.request.params.id
      const { status } = ctx.request.body
      const res = await updateOrder(id, status)

      ctx.body = {
        code: 0,
        message: '修改订单状态成功',
        result: res,
      }
    } catch (error) {
      console.error('修改订单失败', error)
    }
  }
}

module.exports = new OrderController()
