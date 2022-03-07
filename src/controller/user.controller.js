const { createUser } = require('../service/user.service.js')
const { userRegisterError } = require('../constant/error.type')
class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body

    try {
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
      console.error(error);
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  async login(ctx, next) {
    ctx.body = '用户登录成功'
  }
}

module.exports = new UserController()
