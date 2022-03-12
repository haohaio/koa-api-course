const { DataTypes } = require('sequelize')
const sequelize = require('../db/seq')

// 创建模型 表名推断： hh_user => hh_users，person => people
const Addr = sequelize.define(
  'hh_addr',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '用户ID',
    },
    consignee: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '收件人',
    },
    phone: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      comment: '手机号',
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '收货地址',
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '是否为默认地址',
    }
  },
  {
    // 这是其他模型参数 freezeTableName：true 可固定表名，不进行表名推断
  }
)

// User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
// User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配

Addr.sync({ alter: true })

module.exports = Addr
