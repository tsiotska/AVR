"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthorList = getAuthorList;
exports.createAuthor = createAuthor;

var _mongoose = _interopRequireDefault(require("mongoose"));

require("../schemes/authorScheme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var author = _mongoose["default"].model('authorScheme');

function getAuthorList() {
  return author.find();
}

function createAuthor(data) {
  var Author = new author({
    name: data.name,
    surname: data.surname,
    about: data.about,
    createdAt: new Date()
  });
  return Author.save();
}