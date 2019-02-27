const Koa = require('koa')
const routes = require('./routes')

const debug = require('debug')('app:pacbaby')

const app = new Koa()

app.use(routes.routes())
app.use(routes.allowedMethods())
console.log('NODE_ENV', process.env.NODE_ENV, 'PORT', process.env.PORT)
app.listen(process.env.PORT || 80)

console.log(`Server is listen [${process.env.PORT || 80}]`)

module.exports = app
