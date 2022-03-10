const { cartFormatError } = require('../constant/error.type')

const validator = (rules) => {
  return async (ctx, next) => {
    try {
      // goodsId: 'number', // 相当于 { type: 'number', required: true } （简写）
      ctx.verifyParams(rules)
    } catch (error) {
      cartFormatError.result = error
      return ctx.app.emit('error', cartFormatError, ctx)
    }
  
    await next()
  }
}

module.exports = {
  validator,
}
