const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');
const routes = require('./routes/v1');
const { jwtStrategy } = require('./config/passport');
const cors = require('cors');
require('./config/db.connect');
const app = express();

// innit middleware
app.use(express.json());
app.use(morgan('dev')); // log
app.use(helmet()); // hide data
app.use(compression()); // nen payload

// init routes
app.use('/v1', routes);

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// handling error
app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Welcome Blog Tuan Nguyen',
  });
});

module.exports = app;
