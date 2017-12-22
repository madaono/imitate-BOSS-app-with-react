const express = require('express')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')

Router.get('/list', function (req, res) {
  User.find({},function (err,doc) {
    return res.json(doc)
  })
})

Router.post('/register', function (req, res) {
  const {user, pwd, type} = req.body.data
  User.findOne({user},function (err,doc) {
    if (doc){
      return res.json({code:1,msg:'用户名重复'})
    }
    User.create({user,pwd,type},function (e, d) {
      if (e){
        return res.json({code:1,msg:'后端出错'})
      }
      return res.json({code:0})
    })
  })
})

Router.get('/info', function (req, res) {
  //cookie校验
  return res.json({code:1})
})

module.exports = Router