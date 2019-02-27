const request = require('request')
const fs = require('fs')

const gfwlist_url = 'https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt'


const syncGfwList = () => {
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
  }).then(ds => {
    console.log('start 3')
    const custom = fs.readFileSync('./resource/custom.txt').toString()
    return ds.concat(custom.split('\n'))
  }).then(ds => {
    console.log('start 4')
    let pacContent = fs.readFileSync('./resource/proxy.pac').toString()
    const dictds = ds.reduce((p, c) => {
      if (c) {
        p[c] = 1
      }
      return p
    }, {})
    pacContent = pacContent
      .replace('__PROXY__', '\'SOCKS5 127.0.0.1:52194\'')
      .replace('__DOMAINS__', JSON.stringify(dictds, null, 80))

    console.log('start 5')
    return pacContent
  })
}

module.exports = syncGfwList
