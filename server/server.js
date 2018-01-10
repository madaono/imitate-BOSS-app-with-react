//开启mongodb"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"

import path from 'path'
import express from 'express'
// const express = require('express')
import bodyParser from 'body-parser'
import cookParser from 'cookie-parser'
import model from './model'

import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

import csshook from 'css-modules-require-hook/preset' // import hook before routes  hook要放在渲染的组件之前
import assethook from 'asset-require-hook'
assethook({
  extensions:['png']
})

import App from '../src/App'
import reducers from "../src/reducer";
import {renderToString,renderToNodeStream} from 'react-dom/server'
import staticPath from '../build/asset-manifest'



const Chat = model.getModel('chat')

const app = express()
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection',function (socket) {
  // console.log('user login')
  socket.on('sendmsg',function (data) {
    // console.log(data)
    // io.emit('recvmsg',data)
    const {from, to, msg} = data
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg},function (err,doc) {
      io.emit('recvmsg',Object.assign({},doc._doc))
    })
  })
})

const userRouter = require('./user')


//react16有了新的流SSR API，速度比现在这种快3倍
app.use(cookParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.use(function (req,res,next) {
  if (req.url.startsWith('/user/')||req.url.startsWith('/static/')){
    return next()
  }
  const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ))
  let context = {}
  // const markup = renderToString(
  //   <Provider store={store}>
  //     <StaticRouter
  //       location={req.url}
  //       context={context}
  //     >
  //       <App></App>
  //     </StaticRouter>
  //   </Provider>
  // )
  const metaObj = {
    '/msg': 'React聊天消息列表',
    '/boss': 'boss查看牛人列表页面'
  }

  res.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <meta name="keywords" content="React,Redux,Node,SSR,BOSS,">
        <meta name="description" content="${metaObj[req.url]}">
        <title>React BOSS App</title>
        <link rel="stylesheet" href="/${staticPath['main.css']}">
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">
  `)
  const markupStream = renderToNodeStream(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App></App>
      </StaticRouter>
    </Provider>
  )

  markupStream.pipe(res,{end:false})
  markupStream.on('end', ()=>{
    res.write(`
      </div>
          <script src="/${staticPath['main.js']}"></script>
        </body>
      </html>
    `)
    res.end()
  })

/*  const pageHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <meta name="keywords" content="React,Redux,Node,SSR,BOSS,">
        <meta name="description" content="${metaObj[req.url]}">
        <title>React BOSS App</title>
        <link rel="stylesheet" href="/${staticPath['main.css']}">
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">${markup}</div>
        <script src="/${staticPath['main.js']}"></script>
      </body>
    </html>
  `*/

  // res.send(pageHtml)
  // return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))

server.listen(9093,function () {
  console.log('Node app start at port 9093')
})