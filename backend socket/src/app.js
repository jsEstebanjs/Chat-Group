require('dotenv').config();
const express = require('express');
const http = require("http")
const { Server } = require('socket.io')
const morgan = require('morgan');


const app = express();
const server = http.createServer(app)
const port = process.env.PORTSOCKET || 8081
const io = new Server(server, {
  cors: {
    origin: `${process.env.ORIGIN_SOCKET}`,
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})
app.use(morgan("dev"))

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
server.listen(port,()=>{
  console.log(`socket is run in port ${port}`)
});
module.exports = server