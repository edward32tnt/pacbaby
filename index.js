const Koa = require('koa')
const routes = require('./routes')

const debug = require('debug')('app:pacbaby')

const app = new Koa()

app.use(routes.routes())
app.use(routes.allowedMethods())
app.listen(process.env.PORT || 3000)

console.log(`Server is listen [${process.env.PORT || 3000}]`)

module.exports = app
