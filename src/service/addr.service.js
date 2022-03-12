const Addr = require('../model/addr.model')

class AddrService {
  async createAddr(addr) {
    const res = await Addr.create(addr)
    return res.dataValues
  }

  async findAllAddr(userId) {
    const res = await Addr.findAll({
      attributes: ['id', 'consignee', 'address', 'phone', 'isDefault'],
      where: { userId },
    })
    return res
  }

  async updateAddr(id, addr) {
    const res = await Addr.update(addr, { where: { id } })
    return res[0] > 0 ? true : false
  }

  async deleteAddr(id) {
    const res = await Addr.destroy({ where: { id } })
    return res > 0 ? true : false
  }

  async setDefaultAddr(userId, id) {
    await Addr.update({ isDefault: 0 }, { where: { userId } })
    return await Addr.update({ isDefault: 1 }, { where: { id } })
  }
}

module.exports = new AddrService()
