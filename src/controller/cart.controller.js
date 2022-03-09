const { createOrUpdateCart } = require('../service/cart.service')
const {invalidGoodsError} = require('../constant/error.type')

class CartController {
  async add(ctx) {
    const { id: userId } = ctx.state.user
    const { goodsId } = ctx.request.body
    try {
      const res = await createOrUpdateCart(userId, goodsId)
      if (res) {
        ctx.body = {
          code: 0,
          message: '加入购物车成功',
          result: res,
        }
      } else {
        ctx.app.emit('error', invalidGoodsError, ctx)
        console.error('加入购物车失败', res)
      }
    } catch (error) {
      console.error('加入购物车失败', error)
    }
  }
}

module.exports = new CartController()
