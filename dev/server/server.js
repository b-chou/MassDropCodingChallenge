'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('./src'));

require('./routes.js')(app, express);

app.listen(3000, function () {
  return console.log('Listening on Port 3000');
});

module.exports = app;