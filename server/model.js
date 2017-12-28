const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/rboss'
mongoose.connect(DB_URL)

const models = {
  user:{
    'user':{type:String,require:true},
    'pwd':{type:String,require:true},
    'type':{type:String,require:true},
    'avatar':{type:String},
    'desc':{type:String},
    //job title
    'title':{type:String},
  //  if u were a boss
    'compant':{type:String},
    'money':{type:String}
  },
  chat:{
    'chatid':{type:String,require:true},
    'from':{type:Stringm,require:true},
    'to':{type:Stringm,require:true},
    'read':{type:Boolean,default:false},
    'content':{type:Stringm,require:true,default:''},
    'create_time':{type:Number,default:new Date().getTime()},
  }
}

for (let m in models){
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}