const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const { userValidator, verifyUser } = require('../middleware/user.middleware')
const { register, login } = require('../controller/user.controller')

router.get('/', (ctx, next) => {
  ctx.body = 'hello users'
})

router.post('/register', userValidator, verifyUser, register)

router.post('/login', login)

module.exports = router
