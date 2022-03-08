const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
} = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')
const { register, login, modifyPassword } = require('../controller/user.controller')

router.get('/', (ctx, next) => {
  ctx.body = 'hello users'
})

router.post('/register', userValidator, verifyUser, bcryptPassword, register)

router.post('/login', userValidator, verifyLogin, login)

router.patch('/password', auth, bcryptPassword, modifyPassword)

module.exports = router
