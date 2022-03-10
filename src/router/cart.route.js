const Router = require('koa-router')

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')
const { add } = require('../controller/cart.controller')
const { findAll } = require('../controller/cart.controller')

const router = new Router({ prefix: '/cart' })

router.post('/', auth, validator, add)

router.get('/', auth, findAll)

module.exports = router
