const Koa = require('koa')

const userRouter = require('../router/user.route')

const app = new Koa()

// middleware must be a function!
app.use(userRouter.routes())

module.exports = app