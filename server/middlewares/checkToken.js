// 监测 token 是否过期
const jwt = require('jsonwebtoken')

module.exports = (ctx, next) => {
  if (ctx.request.headers['authorization']) {
    let token = ctx.request.headers['authorization'].split(' ')[1]
    // 解构 token，生成一个对象 { name: xx, iat: xx, exp: xx }
    let decoded = jwt.decode(token)
    // console.log(decoded)
    // 监测 token 是否过期，decoded.exp为创建时时间 ➕ 增加设置的过期时间
    if (token && decoded.exp <= Date.now() / 1000) {
      ctx.response.status = 401
      ctx.token = {
        success: false,
        token: false,
        message: 'token过期，请重新登录'
      }
    } else {
      ctx.token = {
        success: true,
        token: true
      }
    }
  }
  next()
}
