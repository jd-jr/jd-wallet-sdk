"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  parseJSON: function parseJSON(str) {
    var json = null;
    try {
      json = JSON.parse(str);
    } catch (e) {
      console.error(e.message);
    }
    return json;
  },
  stringifyJSON: function stringifyJSON(json) {
    var str = null;
    try {
      str = JSON.stringify(json);
    } catch (e) {
      console.error(e.message);
    }
    return str;
  }
};