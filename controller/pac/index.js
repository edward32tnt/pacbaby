const Router = require('koa-router')
const route = new Router()

const { index, update } = require('./pac.controller')

route.get('/', index)
route.get('/update', update)

module.exports = route
