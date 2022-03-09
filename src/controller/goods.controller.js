const path = require('path')
const { fillUploadError, unSupportedFileTypeError, createGoodsError } = require('../constant/error.type')
const {createGoods} = require('../service/goods.service')
class GoodsController {
  async upload(ctx, next) {
    const { file } = ctx.request.files
    // 在这里通过类型检查时，即使返回错误，文件其实还是会上传到服务器，更好的方式时需要配置 koa-body
    const fileTypes = ['image/jpeg', 'image/png']

    if (file) {
      if (!fileTypes.includes(file.type)) {
        return ctx.app.emit('error', unSupportedFileTypeError, ctx)
      }

      ctx.body = {
        code: 0,
        message: '商品图片上传成功',
        result: {
          goodsImg: path.basename(file.path),
        },
      }
    } else {
      return ctx.app.emit('error', fillUploadError, ctx)
    }
  }
  async create(ctx, next) {
    try {
      const res = await createGoods(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '发布商品成功',
        result: res,
      }
    } catch (error) {
      console.error('发布商品失败', error);
      return ctx.app.emit('error', createGoodsError, ctx)
    }
  }
}

module.exports = new GoodsController()
