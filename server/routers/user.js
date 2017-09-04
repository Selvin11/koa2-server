const Router = require('koa-router')

let user = new Router()
const userController = require('../controllers/userController.js')

userController(user)

module.exports = user
