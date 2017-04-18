"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var win = window;
//事件 id
var uuid = 1;

exports.default = function (callback) {
  var funcName = "globalCallback" + undefined.uuid++;
  win[funcName] = function () {
    if (callback) {
      callback.apply(undefined, arguments);
    }
    setTimeout(function () {
      delete win[funcName];
    }, 100);
  };
  return funcName;
};