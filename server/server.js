const express = require('express')
const bodyParser = require('body-parser')
const cookParser = require('cookie-parser')

const app = express()
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection',function (socket) {
  // console.log('user login')
  socket.on('sendmsg',function (data) {
    console.log(data)
    io.emit('recvmsg',data)
  })
})

const userRouter = require('./user')



app.use(cookParser())
app.use(bodyParser.json())
app.use('/user',userRouter)


server.listen(9093,function () {
  console.log('Node app start at port 9093')
})