const { DataTypes } = require('sequelize')
const sequelize = require('../db/seq')
const Goods = require('./goods.model')

// 创建模型
const Cart = sequelize.define(
  'hh_cart',
  {
    // id 会被 sequelize 自动创建
    // 在这里定义模型属性
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // allowNull 默认为 true
      comment: '用户ID',
    },
    goodsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '商品ID',
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '商品个数',
    },
    selected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '是否选中',
    },
  },
  // { paranoid: true } // 会多一个 deletedAt 字段
)

Cart.belongsTo(Goods, {
  foreignKey: 'goodsId',
  as: 'goodsInfo'
})
// Cart.sync({ force: true })

module.exports = Cart
