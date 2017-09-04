const Index = (ctx, next) => {
  ctx.body = 'Hello Express!'
}

module.exports = (router) => {
  router.get('/index', Index)
}
