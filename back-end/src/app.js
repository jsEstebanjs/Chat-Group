require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const userRouter = require('./api/user/user.route');
const groupRouter = require('./api/group/group.route');
const http = require("http")
const { Server } = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = new Server(server,{
  cors:{
    origin:['http://localhost:3000'],
  }
})

io.on('connection',(socket)=>{
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });


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

module.exports = server