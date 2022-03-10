const path = require('path')
const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')
const errorHandler = require('./errorHandler')

const router = require('../router/index')

const app = new Koa()

// middleware must be a function!
app.use(
  KoaBody({
    multipart: true,
    formidable: {
      // 在配置选项时，不推荐使用相对路径, option 的路径是相对于 process.cwd()
      // uploadDir: './src/upload', 相对路径也可以
      uploadDir: path.join(__dirname, '../upload'),
      keepExtensions: true,
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'] // 需要配置 delete 请求
  })
)
app.use(KoaStatic(path.join(__dirname, '../upload')))
app.use(parameter(app))
app.use(router.routes()).use(router.allowedMethods())

// 统一的错误处理
app.on('error', errorHandler)

module.exports = app
