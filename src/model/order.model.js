const { DataTypes } = require('sequelize')
const sequelize = require('../db/seq')
const Addr = require('./addr.model')

// 创建模型 表名推断： hh_user => hh_users，person => people
const Order = sequelize.define(
  'hh_order',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // allowNull 默认为 true
      comment: '用户ID',
    },
    addressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '地址ID',
    },
    goodsInfo: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '商品信息',
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '订单总金额',
    },
    orderNumber: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      comment: '订单编号',
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0, 
      comment: '订单状态（0: 未支付， 1： 已支付，2：已发货，3：已签收，4：取消）',
    }
  },
  {
    // 这是其他模型参数 freezeTableName：true 可固定表名，不进行表名推断
  }
)

// User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
// User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配

// Order.sync({ alter: true })

Order.belongsTo(Addr, {
  foreignKey: 'addressId',
  as: 'addressInfo'
})

module.exports = Order
