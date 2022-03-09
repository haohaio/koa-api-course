const path = require('path')
const {
  fillUploadError,
  unSupportedFileTypeError,
  createGoodsError,
  invalidGoodsIdError,
  invalidDeleteGoodsIdError,
  invalidRestoreGoodsIdError,
} = require('../constant/error.type')
const {
  createGoods,
  updateGoods,
  deleteGoods,
  restoreGoods,
  findGoods,
} = require('../service/goods.service')

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
      const { createdAt, updatedAt, ...res } = await createGoods(
        ctx.request.body
      )
      console.log('res', res)
      ctx.body = {
        code: 0,
        message: '发布商品成功',
        result: res,
      }
    } catch (error) {
      console.error('发布商品失败', error)
      return ctx.app.emit('error', createGoodsError, ctx)
    }
  }
  async update(ctx, next) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '更新商品成功',
          result: '',
        }
      } else {
        ctx.app.emit('error', invalidGoodsIdError, ctx)
      }
    } catch (error) {
      console.error('更新商品失败')
    }
  }

  async remove(ctx, next) {
    try {
      const res = await deleteGoods(ctx.params.id)

      if (res) {
        ctx.body = {
          code: 0,
          message: '下架商品成功',
          result: '',
        }
      } else {
        console.error('待下架的商品不存在')
        ctx.app.emit('error', invalidDeleteGoodsIdError, ctx)
      }
    } catch (error) {
      console.error('下架商品失败')
    }
  }

  async restore(ctx, next) {
    try {
      const res = await restoreGoods(ctx.params.id)

      if (res) {
        ctx.body = {
          code: 0,
          message: '上架商品成功',
          result: '',
        }
      } else {
        console.error('待上架的商品不存在')
        ctx.app.emit('error', invalidRestoreGoodsIdError, ctx)
      }
    } catch (error) {
      console.error('上架商品失败')
    }
  }

  async findAll(ctx, next) {
    try {
      const { pageNum = 1, pageSize = 10 } = ctx.request.query
      const res = await findGoods(pageNum, pageSize)
      ctx.body = {
        code: 0,
        message: '获取商品列表成功',
        result: res,
      }
    } catch (error) {
      console.error('获取商品列表失败', error)
    }
  }
}

module.exports = new GoodsController()
