module.exports = {
  // 00: user
  userFormatError: {
    code: '10001',
    message: '用户名或密码为空',
    result: '',
  },
  userAlreadyExistedError: {
    code: '10002',
    message: '用户已经存在',
    result: '',
  },
  userRegisterError: {
    code: '10003',
    message: '用户注册失败',
    result: '',
  },
  userNotExistError: {
    code: '10004',
    message: '用户不存在',
    result: '',
  },
  userLoginError: {
    code: '10005',
    message: '用户登录失败',
    result: '',
  },
  userInvalidPasswordError: {
    code: '10006',
    message: '用户名或密码错误',
    result: '',
  },
  // 01: auth
  tokenExpiredError: {
    code: '10101',
    message: 'token 过期',
    result: '',
  },
  invalidTokenError: {
    code: '10102',
    message: 'token 无效',
    result: '',
  },
  hasNotAdminPermissionError: {
    code: '10103',
    message: '没有管理员权限',
    result: '',
  },
  // 02：商品模块
  fillUploadError: {
    code: '10201',
    message: '商品图片上传失败',
    result: '',
  },
  unSupportedFileTypeError: {
    code: '10202',
    message: '不支持的文件格式',
    result: '',
  },
  goodsFormatError: {
    code: '10203',
    message: '商品参数格式错误',
    result: '',
  },
  createGoodsError: {
    code: '10204',
    message: '发布商品失败',
    result: '',
  },
  invalidGoodsIdError: {
    code: '10205',
    message: '待修改的商品不存在',
    result: '',
  },
  invalidDeleteGoodsIdError: {
    code: '10206',
    message: '待下架的商品不存在',
    result: '',
  },
  invalidRestoreGoodsIdError: {
    code: '10207',
    message: '待上架的商品不存在',
    result: '',
  },
  cartFormatError: {
    code: '10301',
    message: '购物车参数格式错误',
    result: '',
  },
  invalidGoodsError: {
    code: '10302',
    message: '无效商品',
    result: '',
  },
  addrFormatError: {
    code: '10401',
    message: '地址参数格式错误',
    result: '',
  },
  orderFormatError: {
    code: '10501',
    message: '订单参数格式错误',
    result: '',
  },
}
