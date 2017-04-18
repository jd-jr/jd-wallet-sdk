'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deviceEnv = require('./utils/device-env');

var _callbackFunc = require('./utils/callback-func');

var _callbackFunc2 = _interopRequireDefault(_callbackFunc);

var _openIframe = require('./utils/open-iframe');

var _openIframe2 = _interopRequireDefault(_openIframe);

var _json = require('./utils/json');

var _indexDev = require('./index-dev');

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