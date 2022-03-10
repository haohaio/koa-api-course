const { Op } = require('sequelize')
const Cart = require('../model/cart.model')
const Goods = require('../model/goods.model')

class CartService {
  async createOrUpdateCart(userId, goodsId) {
    const goods = await Goods.findOne({ where: { id: goodsId } })
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

  async findCarts(userId, pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize

    const { count, rows } = await Cart.findAndCountAll({
      where: { userId },
      attributes: ['id', 'number', 'selected'],
      offset,
      limit: +pageSize,
      include: {
        model: Goods,
        as: 'goodsInfo',
        attributes: ['id', 'goodsName', 'goodsPrice', 'goodsImg'],
      },
    })

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    }
  }

  async updateCart({ id, number, selected }) {
    const cart = await Cart.findByPk(id)
    if (!cart) return false
    if (number !== undefined) {
      cart.number = number
    }
    if (selected !== undefined) {
      cart.selected = selected
    }

    return await cart.save()
  }

  async removeCarts(ids) {
    // 返回删除文件的个数
    const res = await Cart.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    })

    return res
  }

  async selectAllCarts(userId) {
    const res = await Cart.update({ selected: true }, { where: { userId } })
    return res
  }

  async unselectAllCarts(userId) {
    const res = await Cart.update({ selected: false }, { where: { userId } })
    return res
  }

  async getGoodsTotal(userId) {
    const res = await Cart.sum('number', { where: { userId } })
    return res
  }
}

module.exports = new CartService()
