const Router = require('koa-router')
const router = new Router({ prefix: '/file' })

router.get('/', (ctx, next) => {
  ctx.body = 'hello file'
})

module.exports = router