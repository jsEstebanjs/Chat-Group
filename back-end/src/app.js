require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors({
  "origin": `*`,
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

app.use(morgan("dev"))

module.exports = app