const request = require('request')
const fs = require('fs')
const debug = require('debug')('pacbaby:lib/syncGfwList')

const gfwlist_url = 'https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt'

const coreGfwList = () => {
  return new Promise((resolve, reject) => {
    request(gfwlist_url, function(err, data) {
      console.log('start 1')
      if (err) return reject(err)
      resolve(data)
    })
  }).then(res => {
    console.log('start 2')
    const lista = Buffer.from(res.body, 'base64').toString('ascii')
    const domains = []
    lista.split('\n').forEach(function(line) {
      if (line.indexOf('.*') > -1) {
        return
      }
      if (line.indexOf('*') > -1) {
        return
      }

      if (line.indexOf('||') === 0) {
        domains.push(line.slice(2))
        return
      }
      if (line.indexOf('|') === 0) {
        domains.push(line.slice(1))
        return
      }
      if (line.indexOf('.') === 0) {
        domains.push(line.slice(1))
        return
      }
    })
    return domains
  })
}
const syncGfwList = async (options) => {
  const { customProxy = 'SOCKS5 127.0.0.1:52194' } = options || {}
  const domains = await coreGfwList()
  debug('getDomain')

  const custom = fs.readFileSync('./resource/custom.txt').toString()
  debug('getCustomDomain')

  const mergedDomain = domains.concat(custom.split('\n'))

  return replaceContent({ customProxy, domains: mergedDomain })
}



const replaceContent = (options) => {
  const {  customProxy = 'SOCKS5 127.0.0.1:52194', domains = [] } = options || {}

  let pacContent = fs.readFileSync('./resource/proxy.pac').toString()
  const dictds = domains.reduce((p, c) => {
    if (c) {
      p[c] = 1
    }
    return p
  }, {})

  pacContent = pacContent
    .replace('__PROXY__', `\'${customProxy}\'`)
    .replace('__DOMAINS__', JSON.stringify(dictds, null, 80))
    // .replace('__PROXY__', '\'SOCKS5 127.0.0.1:52194\'')

  return pacContent
}


module.exports = syncGfwList
