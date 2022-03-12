const {
  createOrder,
} = require('../service/addr.service')

class OrderController {
  async create(ctx) {
    const userId = ctx.state.user.id
    const { consignee, phone, address } = ctx.request.body

    const res = await createOrder({ userId, consignee, phone, address })

    ctx.body = {
      code: 0,
      message: '添加地址成功',
      result: res,
    }
  }
}

module.exports = new OrderController()
