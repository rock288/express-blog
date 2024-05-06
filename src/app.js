const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('./config/db.connect')
const app = express();


// innit middleware
app.use(express.json())
app.use(morgan("dev")); // log
app.use(helmet()); // hide data
app.use(compression()); // nen payload

// init db

// handling error
app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Welcome Blog Tuan Nguyen'
  })
})

module.exports = app