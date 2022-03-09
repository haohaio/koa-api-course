const { goodsFormatError } = require('../constant/error.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goodsName: { type: 'string', required: true },
      goodsPrice: { type: 'number', required: true },
      goodsNum: { type: 'number', required: true },
      goodsImg: { type: 'string', required: true },
    })
  } catch (error) {
    goodsFormatError.result = error
    return ctx.app.emit('error', goodsFormatError, ctx)
  }

  await next()
}

module.exports = {
  validator,
}
