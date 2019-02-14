const syncGfwList = require('../../lib/syncGfwList')
const fs = require('fs')

module.exports = (req, res) => {
  // console.log('hhhhh')
  syncGfwList().then(pac => {
    res.end(pac)
  })
}
