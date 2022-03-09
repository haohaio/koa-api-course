const { Op } = require('sequelize')
const Cart = require('../model/cart.model')
const Goods = require('../model/goods.model')

class CartService {
  async createOrUpdateCart(userId, goodsId) {
    const goods = await Goods.findOne({ where: { id: goodsId }})
    if (!goods) {
      return false
    }

    let res = await Cart.findOne({ where: { [Op.and]: userId, goodsId } })

    if (res) {
      // 步长为 1 时， 可省略 by 参数
      await res.increment('number', { by: 1 })
      await res.reload()
    } else {
      res = await Cart.create({ userId, goodsId })
    }

    return res.dataValues
  }
}

module.exports = new CartService()
