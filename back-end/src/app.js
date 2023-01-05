require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const userRouter = require('./api/user/user.route');
const groupRouter = require('./api/group/group.route');
const invitationRouter = require('./api/invitation/invitation.route');
const messageRouter = require('./api/message/message.route');

const app = express();
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

module.exports = app