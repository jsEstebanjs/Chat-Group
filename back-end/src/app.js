require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const userRouter = require('./api/user/user.route');
const groupRouter = require('./api/group/group.route');
const invitationRouter = require('./api/invitation/invitation.route');
const messageRouter = require('./api/message/message.route');
const http = require("http")
const { Server } = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: [`${process.env.ORIGIN}`],
  }
})

io.on('connection', (socket) => {

  socket.on("join_room", (data) => {
    try{
      socket.join(data);
    }catch(err){
      console.log(`could not join room ${err}`)
    }
  });

  socket.on("send_message", (data) => {
    try{
      socket.to(data.groupId).emit("receive_message", data);
    }catch(err){
      console.log(`the message could not be sent ${err}`)
    }
  });
  socket.on("update_group", (data) => {
    try{
      socket.to(data._id).emit("emit_update_group", data);
    }catch(err){
      console.log(`could not send update ${err}`)
    }
  })
  socket.on("delete_group", (data) => {
    try{
      socket.to(data).emit("emit_delete_group", data);
    }catch(err){
      console.log(`could not send deleted group ${err}`)
    }
  })

  socket.on("waiting_for_user_updates", (data) => {
    try{
      socket.join(data)
    }catch(err){
      console.log(`could not wait for user updates ${err}`)
    }
  })

  socket.on("send_update_user", (data) => {
    try{
      socket.to(data.emailUser).emit("receive_update_user", data)
    }catch(err){
      console.log(`failed to send user update ${err}`)
    }
  })


  socket.on("leave_room",(room)=>{
    try{
      socket.leave(room);
    }catch(err){
      console.log(`could not leave the room ${err}`)
    }

  })


})
app.use(express.json())
app.use(cors({
  "origin": `${process.env.ORIGIN}`,
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))
app.use(morgan("dev"))
app.use('/users', userRouter)
app.use('/groups', groupRouter)
app.use('/invitation', invitationRouter)
app.use('/message', messageRouter)

module.exports = server