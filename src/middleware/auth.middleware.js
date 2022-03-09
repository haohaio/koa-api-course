const jwt = require('jsonwebtoken')
const app = require('../app')
const { JWT_SECRET } = require('../config/config.default')
const {
  tokenExpiredError,
  invalidTokenError,
  hasNotAdminPermissionError
} = require('../constant/error.type')

const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')

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

const hasAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user

  if (!is_admin) {
    console.error('该用户没有管理员权限')
    return ctx.app.emit('error', hasNotAdminPermissionError, ctx)
  }

  await next()
}

module.exports = {
  auth,
  hasAdminPermission
}
