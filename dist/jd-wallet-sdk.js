/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// 京东钱包 sdk 接口，当不在钱包中访问，调用该接口模拟
	var walletApi = {

	  // 获取App端登录用户信息

	  getClientInfo: function getClientInfo(callback) {
	    console.info('获取App端登录用户信息');
	    var clientInfo = {
	      clientName: 'android',
	      version: '1.0.0',
	      auth: 'true',
	      isRealName: '1',
	      jdPin: 'linder0209',
	      loginName: 'loginName'
	    };
	    setTimeout(function () {
	      callback(JSON.stringify(clientInfo));
	    }, 300);
	  },


	  //跳转到登录页
	  login: function login(callback) {
	    console.info('跳转到登录页');
	    var info = { auth: '95dc08ef1134dc3aade58306b4a8cddf' };
	    setTimeout(function () {
	      callback(JSON.stringify(info));
	    }, 300);
	  },


	  // 实名认证
	  realName: function realName(callback) {
	    console.info('实名认证');
	    var info = JSON.stringify({ isRealName: 1 });
	    setTimeout(function () {
	      callback(info);
	    }, 300);
	  },


	  // 绑定 jdPin
	  bindJdPin: function bindJdPin(callback) {
	    console.info('绑定 jdPin');
	    var info = JSON.stringify({ jdPin: 'linder0209' });
	    setTimeout(function () {
	      callback(info);
	    }, 300);
	  },


	  // 支付
	  pay: function pay(payParam, callback) {
	    console.info('支付参数： ' + payParam);
	    var payResult = { status: 'SUCCESS' };
	    setTimeout(function () {
	      callback(JSON.stringify(payResult));
	    }, 300);
	  },


	  //设置标题
	  setTitle: function setTitle(title) {
	    console.info('设置标题： ' + title);
	  },


	  /**
	   * 设置右侧标题
	   * @param menus
	   */
	  setMenu: function setMenu(menus) {
	    menus = menus ? JSON.stringify(menus) : '';
	    console.info('设置右侧标题菜单： ' + menus);
	  },


	  /**
	   * alert 提示信息
	   * ios 支持回调，Android 不支持
	   * @param text
	   * @param callback
	   */
	  alert: function alert(text) {
	    var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

	    console.info('打印信息');
	    console.info(text);
	  },


	  /**
	   * 设置埋点
	   */
	  buriedPoint: function buriedPoint(pointEvent) {
	    pointEvent = JSON.stringify(pointEvent);
	    console.info('设置埋点： ' + pointEvent);
	  }
	};

	exports.default = walletApi;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _deviceEnv = __webpack_require__(4);

	var _callbackFunc = __webpack_require__(3);

	var _callbackFunc2 = _interopRequireDefault(_callbackFunc);

	var _openIframe = __webpack_require__(6);

	var _openIframe2 = _interopRequireDefault(_openIframe);

	var _json = __webpack_require__(5);

	var _indexDev = __webpack_require__(1);

	var _indexDev2 = _interopRequireDefault(_indexDev);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var win = window;

	// 京东钱包 sdk 接口
	var walletApi = {

	  // 获取App端登录用户信息

	  getClientInfo: function getClientInfo(callback) {
	    var funcName = (0, _callbackFunc2.default)(callback);
	    if (_deviceEnv.ios) {
	      (0, _openIframe2.default)('native://getInfo?callback=' + funcName);
	    } else {
	      _deviceEnv.android.getInfo(funcName);
	    }
	  },


	  //跳转到登录页
	  login: function login(callback) {
	    var funcName = (0, _callbackFunc2.default)(callback);
	    if (_deviceEnv.ios) {
	      (0, _openIframe2.default)('native://start?name=LOGIN&callback=' + funcName);
	    } else {
	      _deviceEnv.android.start('LOGIN', funcName);
	    }
	  },


	  // 实名认证
	  realName: function realName(callback) {
	    var funcName = (0, _callbackFunc2.default)(callback);
	    if (_deviceEnv.ios) {
	      (0, _openIframe2.default)('native://start?name=REALNAME&callback=' + funcName);
	    } else {
	      _deviceEnv.android.start('REALNAME', funcName);
	    }
	  },


	  // 绑定 jdPin
	  bindJdPin: function bindJdPin(callback) {
	    var funcName = (0, _callbackFunc2.default)(callback);
	    if (_deviceEnv.ios) {
	      (0, _openIframe2.default)('native://start?name=BINDJDACCOUNT&callback=' + funcName);
	    } else {
	      _deviceEnv.android.start('BINDJD', funcName);
	    }
	  },


	  // 支付
	  pay: function pay(payParam, callback) {
	    var param = JSON.stringify(payParam);
	    var funcName = (0, _callbackFunc2.default)(callback);
	    if (_deviceEnv.ios) {
	      (0, _openIframe2.default)('native://commonPay?params=' + param + '&callback=' + funcName);
	    } else {
	      _deviceEnv.android.pay(param, funcName);
	    }
	  },


	  //设置标题
	  setTitle: function setTitle(title) {
	    if (_deviceEnv.ios) {
	      (0, _openIframe2.default)('native://setTitleName?titleName=' + title);
	    } else {
	      _deviceEnv.android.setTitleName(title);
	    }
	  },


	  /**
	   * 设置右侧标题
	   * @param menus
	   * 参数格式
	   [{
	   "menuTitle": "扫一扫",
	   "menuImage": "http://localhost:8080/sao.png",
	   "menuDesc": "扫一扫",
	   "menuAction": "scanCallback"
	   }]
	   *
	   * android: android.setTitleMenu(menuList);
	   iOS : WebViewJavascriptBridge.callHandler("setMenu",
	   {item1:{menuTitle:"内容1",menuDesc:"内容1Description",menuImage:"1.png",menuAction:"alert(12121212121)"},
	   item2:{menuTitle:"内容2",menuDesc : "内容2Description",menuImage:"2.png",menuAction:"alert(21212121212)"}})
	   ：WebViewJavascriptBridge.callHandler("setMenu" ,null) 隐藏之前设置的MENU
	   */
	  setMenu: function setMenu(menus) {
	    if (_deviceEnv.ios) {
	      if (!menus && win.WebViewJavascriptBridge) {
	        //隐藏
	        win.WebViewJavascriptBridge.callHandler('setMenu', null);
	        return;
	      }
	      var json = menus.reduce(function (composed, item, index) {
	        var funcName = (0, _callbackFunc2.default)(item.menuAction);
	        item.menuAction = funcName;
	        composed['item' + (index + 1)] = item;
	        return composed;
	      }, {});
	      if (win.WebViewJavascriptBridge) {
	        win.WebViewJavascriptBridge.callHandler('setMenu', json);
	      }
	    } else {
	      if (!menus) {
	        //隐藏
	        menus = [{
	          menuTitle: ' ',
	          menuAction: ''
	        }];
	      } else {
	        menus.forEach(function (item) {
	          var funcName = (0, _callbackFunc2.default)(item.menuAction);
	          item.menuAction = funcName;
	        });
	      }
	      _deviceEnv.android.setTitleMenu((0, _json.stringifyJSON)(menus));
	    }
	  },


	  /**
	   * alert 提示信息
	   * ios 支持回调，Android 不支持
	   * @param text
	   * @param callback
	   */
	  alert: function alert(text) {
	    var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

	    var funcName = (0, _callbackFunc2.default)(callback);
	    if (_deviceEnv.ios) {
	      (0, _openIframe2.default)('native://alert?text=' + text + '&callback=' + funcName);
	    } else {
	      _deviceEnv.android.alert(text);
	    }
	  },


	  /**
	   * 设置埋点
	   * 一般设置为多次埋点即可，eventId 和 eventLabel 默认设置为一样值即可
	   * @param pointEvent {once: true, eventId: '', eventLabel: ''}
	   */
	  buriedPoint: function buriedPoint(pointEvent) {
	    var once = pointEvent.once;
	    if (_deviceEnv.ios) {
	      if (once) {
	        (0, _openIframe2.default)('native://buriedPoint?eventId=' + pointEvent.eventId);
	      } else {
	        (0, _openIframe2.default)('native://buriedPoint?eventId=' + pointEvent.eventId + '&eventLable=' + pointEvent.eventLable);
	      }
	    } else {
	      if (once) {
	        _deviceEnv.android.buriedPointOnce(pointEvent.eventId);
	      } else {
	        _deviceEnv.android.buriedPoint(pointEvent.eventId, pointEvent.eventLable);
	      }
	    }
	  }
	};

	exports.default = _deviceEnv.jdWalletApp ? walletApi : _indexDev2.default;

/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var win = window;
	var ua = win.navigator.userAgent;

	var deviceEnv = {
	  wx: ua.search(/micromessenger/ig) !== -1, // 微信
	  ios: ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1, // ios 系统
	  android: ua.indexOf('Android') !== -1, // Android 系统
	  jdWalletApp: ua.indexOf('WalletClient') !== -1, // 京东钱包 app
	  jdapp: ua.indexOf('jdapp') !== -1, // 京东 app
	  mjd: location.pathname.indexOf('share/jr') !== -1, // FIXME 待确定

	  // 返回设备名称
	  getDeviceName: function getDeviceName() {
	    if (this.android) {
	      return 'android';
	    } else if (this.ios) {
	      return 'ios';
	    }
	    return 'android';
	  }
	};

	exports.default = deviceEnv;

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ },
/* 6 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);