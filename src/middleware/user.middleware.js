const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service.js')
const {
  userFormatError,
  userAlreadyExistedError,
  userRegisterError,
  userNotExistError,
  userLoginError,
  userInvalidPasswordError,
} = require('../constant/error.type')

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body

  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    // ctx.status = 400 // Bad Request 前端错误
    ctx.app.emit('error', userFormatError, ctx)
    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  // 调用 service 层代码，尽量都加在 try...catch
  try {
    const res = await getUserInfo({ user_name })
    if (res) {
      // ctx.status = 409 // Conflict 存在冲突
      ctx.app.emit('error', userAlreadyExistedError, ctx)
      return
    }
  } catch (error) {
    console.error(error)
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }

  await next()
}

const bcryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10)
  // hash 保存的是密文
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash
  console.log('bcryptPassword')
  await next()
}

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body

  try {
    const res = await getUserInfo({ user_name })
    if (!res) {
      console.error('用户名不存在', user_name)
      ctx.app.emit('error', userNotExistError, ctx)
      return
    }

    if (!bcrypt.compareSync(password, res.password)) {
      console.error('用户密码错误', user_name)
      ctx.app.emit('error', userInvalidPasswordError, ctx)
      return
    }
  } catch (error) {
    console.error(error)
    ctx.app.emit('error', userLoginError, ctx)
    return
  }

  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
}
