const mongoose = require('mongoose');

const mongoURL = 'mongodb://piquerg:KsVN4896bYdGLDBJ@35.204.100.96:27017/main';

module.exports = mongoose.connect(mongoURL, { useNewUrlParser: true });
