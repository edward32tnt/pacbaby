const debug = require('debug')('app:server.controller.pac')
const syncGfwList = require('../../lib/syncGfwList')

let cacheScript = 'Downloading...'

syncGfwList().then(res => cacheScript = res)

exports.index = async ctx => {
  ctx.body = cacheScript
}

exports.update = async ctx => {
  cacheScript = 'Downloading'
  await syncGfwList().then(res => cacheScript = res)
  ctx.body = 'ok'
}
