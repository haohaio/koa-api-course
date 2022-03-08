const Koa = require('koa')
const koaBody = require('koa-body')
const errorHandler = require('./errorHandler')

const router = require('../router/index')


const app = new Koa()

// middleware must be a function!
app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods())

// 统一的错误处理
app.on('error', errorHandler)

module.exports = app