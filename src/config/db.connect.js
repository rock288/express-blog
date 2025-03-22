const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL).then(() => console.log('Connected DB success!'));
