const { DataTypes } = require('sequelize')
const sequelize = require('../db/seq')

// 创建模型 表名推断： hh_user => hh_users，person => people
const User = sequelize.define(
  'hh_user',
  {
    // id 会被 sequelize 自动创建
    // 在这里定义模型属性
    user_name: {
      type: DataTypes.STRING,
      allowNull: false, // allowNull 默认为 true
      unique: true,
      comment: '用户名，唯一',
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: '密码',
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: '是否为管理员， 0：不是管理员（默认），1：管理员',
    },
  },
  {
    // 这是其他模型参数 freezeTableName：true 可固定表名，不进行表名推断
  }
)

// User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
// User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配

// 强制同步数据库（创建数据表）
// User.sync({ force: true })

module.exports = User
