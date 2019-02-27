const Router = require('koa-router')
const route = new Router()

const { index, update, custom } = require('./pac.controller')

route.get('/', index)
route.get('/update', update)
route.get('/custom', custom)

module.exports = route
