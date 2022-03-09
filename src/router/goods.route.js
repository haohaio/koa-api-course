const Router = require('koa-router')
const { upload, create, update, remove, restore } = require('../controller/goods.controller')
const { auth, hasAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')

const router = new Router({ prefix: '/goods' })

// 商品图片上传
router.post('/upload', auth, hasAdminPermission, upload)

// 发布商品
router.post('/', auth, hasAdminPermission, validator, create)

// 修改商品
router.put('/:id', auth, hasAdminPermission, validator, update)

// 硬删除 force: true
// router.delete('/:id', auth, hasAdminPermission, remove)

// 软删除
router.post('/:id/off', auth, hasAdminPermission, remove)

// 恢复软删除
router.post('/:id/on', auth, hasAdminPermission, restore)

module.exports = router
