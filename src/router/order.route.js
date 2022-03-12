const Router = require('koa-router')

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/order.middleware')
const {
  create,
  getAll,
  updateStatus,
} = require('../controller/order.controller')

const router = new Router({ prefix: '/orders' })

router.post(
  '/',
  auth,
  validator({
    addressId: 'int',
    goodsInfo: 'string',
    total: 'number',
  }),
  create
)

router.get('/', auth, getAll)

router.patch('/:id', auth, validator({ status: 'number' }), updateStatus)

module.exports = router
