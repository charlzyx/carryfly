var express = require('./config/express.js');
var mongoose = require('./config/mongoose.js');

var db = mongoose();
var app = express();

module.exports = app;