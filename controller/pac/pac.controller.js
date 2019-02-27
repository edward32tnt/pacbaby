const debug = require('debug')('app:server.controller.pac')
const syncGfwList = require('../../lib/syncGfwList')

let cacheScript = 'Downloading...'


syncGfwList().then(dm => cacheScript = dm)

exports.index = async ctx => {
  ctx.body = cacheScript
}

exports.update = async ctx => {
  cacheScript = 'Downloading'
  syncGfwList()
  ctx.body = 'ok'
}
