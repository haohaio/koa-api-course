const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError, invalidTokenError } = require('../constant/error.type')

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  console.log('token', token)

  try {
    // 拿到 payload 的信息
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        console.error('token 过期', error)
        return ctx.app.emit('error', tokenExpiredError, ctx)

      case 'JsonWebTokenError':
        console.error('token 无效', error)
        return ctx.app.emit('error', invalidTokenError, ctx)

      case 'NotBeforeError':
        console.error('服务器时间错误', error)
        break

      default:
        break
    }
    return
  }

  await next()
}

module.exports = {
  auth,
}
