const Router = require('koa-router')

let index = new Router()
const IndexController = require('../controllers/indexController.js')

IndexController(index)

module.exports = index
