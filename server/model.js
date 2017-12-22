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
  }
}