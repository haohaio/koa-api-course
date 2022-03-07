const Koa = require('koa')
const koaBody = require('koa-body')
const errorHandler = require('./errorHandler')

const userRouter = require('../router/user.route')

const app = new Koa()

// middleware must be a function!
app.use(koaBody())
app.use(userRouter.routes())

// 统一的错误处理
app.on('error', errorHandler)

module.exports = app