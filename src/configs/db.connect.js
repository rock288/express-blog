const mongoose = require('mongoose');

const MONGOOSE_URL = process.env.MONGOOSE_URL;

const connect = mongoose.connect(MONGOOSE_URL)
  .then(() => console.log('Connected DB success!'));

  module.exports = connect;