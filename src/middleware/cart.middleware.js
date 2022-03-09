const { cartFormatError } = require('../constant/error.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goodsId: 'number', // 相当于 { type: 'number', required: true } （简写）
    })
  } catch (error) {
    cartFormatError.result = error
    return ctx.app.emit('error', cartFormatError, ctx)
  }

  await next()
}

module.exports = {
  validator,
}
