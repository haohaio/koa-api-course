const { DataTypes } = require('sequelize')
const sequelize = require('../db/seq')

// 创建模型 表名推断： hh_user => hh_users，person => people
const Goods = sequelize.define('hh_goods', {
  // id 会被 sequelize 自动创建
  // 在这里定义模型属性
  goodsName: {
    type: DataTypes.STRING,
    allowNull: false, // allowNull 默认为 true
    comment: '商品名称',
  },
  goodsPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '商品价格',
  },
  goodsNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '商品库存',
  },
  goodsImg: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品图片url',
  },
})

Goods.sync({ force: true })

module.exports = Goods
