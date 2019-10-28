"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUpConnection = setUpConnection;
exports.closeDataBase = closeDataBase;
exports.dbUrl = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dbUrl = 'mongodb://localhost:27017/info'; //mongodb+srv://big_siski:<1111>@cluster0-xtbl3.mongodb.net/test?retryWrites=true&w=majority

exports.dbUrl = dbUrl;

function setUpConnection() {
  _mongoose["default"].connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false
  }).then(function () {
    console.log("DataBase is ready!");
  })["catch"](function (err) {
    console.log('Error on database: ' + err.stack);
    process.exit(1);
  });
}

function closeDataBase() {
  _mongoose["default"].connection.close();
}