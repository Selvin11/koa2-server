const User = require('../models/user')
const sha1 = require('sha1')
const createToken = require('../middlewares/createToken')
const checkToken = require('../middlewares/checkToken')

const Register = async (ctx) => {
  let result = {
    success: false,
    message: '',
    data: null
  }
  let post = ctx.request.body
  // 判断是否已注册
  await User.findOne({
    name: post.name
  }).then(user => {
    if (user) {
      result.message = '已注册'
      ctx.body = result
      return false
    }
  }).catch(err => {
    ctx.body = err
  })
  let userResult = await User.create({
    name: post.name,
    password: sha1(post.password),
    token: createToken(post.name)
  })
  if (userResult) {
    result.success = true
    result.message = '注册成功'
    result.data = {
      name: post.name
    }
  }
  ctx.body = result
}

const Login = async ctx => {
  let result = {
    success: false,
    message: '',
    data: null
  }
  let post = ctx.request.body
  // 判断是否已注册
  await User.findOne({
    name: post.name
  }).then(user => {
    if (!user) {
      result.message = '账号不存在'
      ctx.body = result
      return false
    } else if (sha1(post.password) === user.password) {
      result.success = true
      result.message = '登录成功'
      // 返回更新后的token字段跟登录名，前端才能更新token
      result.data = {
        name: user.name,
        token: createToken(user.name)
      }
    } else {
      result.message = '密码错误'
    }
  }).catch(err => {
    ctx.body = err
  })
  ctx.body = result
}

const GetToken = async ctx => {
  ctx.body = ctx.token
}

module.exports = (router) => {
  router.post('/token/register', Register)
  router.post('/token/login', Login)
  router.get('/token', checkToken, GetToken)
}
