const express = require('express')
const Router = express.Router()

Router.get('/info', function (req, res) {
  //cookie校验
  return res.json({code:0})
})

module.exports = Router