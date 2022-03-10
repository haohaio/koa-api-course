const {
  createOrUpdateCart,
  findCarts,
  updateCart,
  removeCarts,
  selectAllCarts,
  unselectAllCarts,
  getGoodsTotal
} = require('../service/cart.service')
const { invalidGoodsError, cartFormatError } = require('../constant/error.type')

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

  async findAll(ctx) {
    const { id: userId } = ctx.state.user
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    const res = await findCarts(userId, pageNum, pageSize)
    if (res) {
      ctx.body = {
        code: 0,
        message: '获取购物车列表成功',
        result: res,
      }
    } else {
      console.error('获取购物车列表失败', error)
    }
  }

  async update(ctx) {
    const id = ctx.request.params.id
    const { number, selected } = ctx.request.body
    console.log('ctx.request.body', ctx.request.body)
    if (number === undefined && selected === undefined) {
      cartFormatError.message = 'number 和 selected 不能同时为空'
      return ctx.app.emit('error', cartFormatError, ctx)
    }

    const res = await updateCart({ id, number, selected })
    if (res) {
      ctx.body = {
        code: 0,
        message: '更新购物车成功',
        result: res,
      }
    } else {
      cartFormatError.message = '查找不到相应记录'
      return ctx.app.emit('error', cartFormatError, ctx)
    }
  }

  async remove(ctx) {
    const { ids } = ctx.request.body
    const res = await removeCarts(ids)
    ctx.body = {
      code: 0,
      message: '删除购物车成功',
      result: res
    }
  }

  async selectAll(ctx) {
    const userId = ctx.state.user.id
    const res = await selectAllCarts(userId)
    ctx.body = {
      code: 0,
      message: '全部选中成功',
      result: res
    }
  }

  async unselectAll(ctx) {
    const userId = ctx.state.user.id
    const res = await unselectAllCarts(userId)
    ctx.body = {
      code: 0,
      message: '全部取消选中成功',
      result: res
    }
  }

  async total(ctx) {
    const userId = ctx.state.user.id
    const res = await getGoodsTotal(userId)
    ctx.body = {
      code: 0,
      message: '获取购物车商品数量成功',
      result: {
        total: res
      }
    }
  }
}

module.exports = new CartController()
