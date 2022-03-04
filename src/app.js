const Koa = require('koa')

const router = require('./router/file.route')
const { APP_PORT } = require('./config/config.default')

const app = new Koa()

// middleware must be a function!
app.use(router.routes()).use(router.allowedMethods())


app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`)
})
