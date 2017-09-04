// 采用nodemon启动此文件，实现开发阶段修改重启服务
// 1. 当服务端api文件改变，服务端重启，更新接口数据
// 2. 而页面无需重新刷新，因为页面只是发起接口请求，只要接口更新了，再次发起请求，返回数据也就更新了
const pkg = require('./package')
const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const cors = require('kcors')

const Router = require('koa-router')
const index = require('./server/routers/index')
const user = require('./server/routers/user')

const app = new Koa()
const port = process.env.PORT || 3000

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, 'static')))

// 配置跨域
app.use(cors())

// 初始化路由中间件
const router = new Router()
router.use('', index.routes(), index.allowedMethods())
router.use('/api', user.routes(), user.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

// 监听启动端口
app.listen(port, () => {
  console.log(`${pkg.name} listening on port ${port}`)
})
