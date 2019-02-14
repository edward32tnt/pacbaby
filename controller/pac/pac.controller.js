const debug = require('debug')('app:server.controller.pac')
const syncGfwList = require('../../lib/syncGfwList')

let cacheScript = 'Downloading...'


syncGfwlist().then(dm => cacheScript = dm)

exports.index = async ctx => {
  ctx.body = cacheScript
}

exports.update = async ctx => {
  cacheScript = 'Downloading'
  syncGfwlist()
  ctx.body = 'ok'
}
