const Router = require('koa-router')

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')
const { add, update, remove, selectAll, unselectAll, total } = require('../controller/cart.controller')
const { findAll } = require('../controller/cart.controller')

const router = new Router({ prefix: '/cart' })

router.post('/', auth, validator({ goodsId: 'number' }), add)

router.get('/', auth, findAll)

router.patch(
  '/:id',
  auth,
  validator({
    number: { type: 'number', required: false },
    selected: { type: 'bool', required: false },
  }),
  update
)


// 默认情况下 get 和 delete 请求，koa-body 不会将参数挂载到 request.body
router.delete('/', auth, validator({ ids: 'array' }), remove)

router.post('/selectAll', auth, selectAll)
router.post('/unselectAll', auth, unselectAll)

router.get('/total', auth, total)

module.exports = router
