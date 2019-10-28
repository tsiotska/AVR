"use strict";

var _database = require("./database/database");

var _collections = _interopRequireDefault(require("./routes/collections"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors');

var app = express();
app.use(cors('localhost:3000'));
app.use(bodyParser.json());
(0, _database.setUpConnection)();
app.use('/api/collections', _collections["default"]);
app.use('/api/login', _collections["default"]);
app.use('/api/users', _collections["default"]);
app.listen(5000, function () {
  return console.log("started at 5000");
});
module.exports = app;