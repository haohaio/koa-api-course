module.exports = {
  // 00: user
  userFormatError: {
    code: '10001',
    message: '用户名或密码为空',
    result: ''
  },
  userAlreadyExistedError: {
    code: '10002',
    message: '用户已经存在',
    result: ''
  },
  userRegisterError: {
    code: '10003',
    message: '用户注册失败',
    result: ''
  },
  userNotExistError: {
    code: '10004',
    message: '用户不存在',
    result: ''
  },
  userLoginError: {
    code: '10005',
    message: '用户登录失败',
    result: ''
  },
  userInvalidPasswordError: {
    code: '10006',
    message: '用户名或密码错误',
    result: ''
  },
  // 01: auth
  tokenExpiredError: {
    code: '10101',
    message: 'token 过期',
    result: ''
  },
  invalidTokenError: {
    code: '10101',
    message: 'token 无效',
    result: ''
  }
}