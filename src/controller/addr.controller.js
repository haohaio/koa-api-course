const {
  createAddr,
  findAllAddr,
  updateAddr,
  deleteAddr,
  setDefaultAddr
} = require('../service/addr.service')

class AddrController {
  async create(ctx) {
    const userId = ctx.state.user.id
    const { consignee, phone, address } = ctx.request.body

    const res = await createAddr({ userId, consignee, phone, address })

    ctx.body = {
      code: 0,
      message: '添加地址成功',
      result: res,
    }
  }

  async findAll(ctx) {
    const userId = ctx.state.user.id

    const res = await findAllAddr(userId)
    ctx.body = {
      code: 0,
      message: '获取地址列表成功',
      result: res,
    }
  }

  async update(ctx) {
    const id = ctx.request.params.id
    const { consignee, phone, address, isDefault } = ctx.request.body
    const res = await updateAddr(id, { consignee, phone, address, isDefault })
    if (res) {
      ctx.body = {
        code: 0,
        message: '更新地址成功',
        result: res,
      }
    }
  }

  async remove(ctx) {
    const id = ctx.request.params.id
    const res = await deleteAddr(id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除地址成功',
        result: res,
      }
    }
  }

  async setDefault(ctx) {
    const userId = ctx.state.user.id
    const id = ctx.request.params.id
    const res = await setDefaultAddr(userId, id)
    ctx.body = {
      code: 0,
      message: '设置默认地址成功',
      result: res,
    }
  }
}

module.exports = new AddrController()
