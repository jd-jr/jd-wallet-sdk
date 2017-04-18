'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//ios下创建iframe

exports.default = function (src) {
  var iframeEl = document.createElement('iframe');
  iframeEl.src = src;
  iframeEl.style.display = 'none';
  document.body.appendChild(iframeEl);
  setTimeout(function () {
    document.body.removeChild(iframeEl);
  }, 2000);
};