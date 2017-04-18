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