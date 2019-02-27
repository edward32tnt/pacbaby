const Router = require('koa-router')
const serve = require('koa-static')
const route = new Router()

const ctl = require('./controller/pac')

route.use('/pac', ctl.routes(), ctl.allowedMethods())
route.use('/', ctx => {
  ctx.body = 'running'
})

module.exports = route
