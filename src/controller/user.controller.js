const jwt = require('jsonwebtoken')
const {
  createUser,
  getUserInfo,
  updateById,
} = require('../service/user.service.js')
const { userRegisterError } = require('../constant/error.type')
const { JWT_SECRET } = require('../config/config.default')
class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body

    try {
      // 在将密码保存到数据库之前，需要对密码进行加密 bcrypt
      const res = await createUser(user_name, password)

      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      }
    } catch (error) {
      console.error(error)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  async login(ctx, next) {
    const { user_name, password } = ctx.request.body

    // 获取用户信息 （token 的 payload 中，记录 id， user_name, is_admin）
    try {
      // 剔除掉 password，将剩下的属性放到 payload 中
      const { password, ...user } = await getUserInfo({ user_name })
      ctx.body = {
        code: 0,
        message: '用户登陆成功',
        result: {
          token: jwt.sign(user, JWT_SECRET, { expiresIn: '1d' }), // 有效期：1天
        },
      }
    } catch (error) {
      console.error('用户登录失败', error)
    }
  }

  async modifyPassword(ctx, next) {
    const id = ctx.state.user.id
    const password = ctx.request.body.password
    if (await updateById({ id, password })) {
      ctx.body = {
        code: 0,
        message: '修改密码成功',
        result: ''
      }
    } else {
      ctx.body = {
        code: '10007',
        message: '修改密码失败',
        res: ''
      }
    }
  }
}

module.exports = new UserController()
