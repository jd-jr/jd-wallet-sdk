import {ios, android, jdWalletApp} from './utils/device-env';
import callbackFunc from './utils/callback-func';
import openIframe from './utils/open-iframe';
import {stringifyJSON} from './utils/json';
import walletApiDev from './index-dev';

const win = window;

// 京东钱包 sdk 接口
let walletApi = {

  // 获取App端登录用户信息
  getClientInfo(callback) {
    const funcName = callbackFunc(callback);
    if (ios) {
      openIframe(`native://getInfo?callback=${funcName}`);
    } else {
      android.getInfo(funcName);
    }
  },

  //跳转到登录页
  login (callback) {
    const funcName = callbackFunc(callback);
    if (ios) {
      openIframe(`native://start?name=LOGIN&callback=${funcName}`);
    } else {
      android.start('LOGIN', funcName);
    }
  },

  // 实名认证
  realName (callback) {
    const funcName = callbackFunc(callback);
    if (ios) {
      openIframe(`native://start?name=REALNAME&callback=${funcName}`);
    } else {
      android.start('REALNAME', funcName);
    }
  },

  // 绑定 jdPin
  bindJdPin (callback) {
    const funcName = callbackFunc(callback);
    if (ios) {
      openIframe(`native://start?name=BINDJDACCOUNT&callback=${funcName}`);
    } else {
      android.start('BINDJD', funcName);
    }
  },

  // 支付
  pay (payParam, callback) {
    const param = JSON.stringify(payParam);
    const funcName = callbackFunc(callback);
    if (ios) {
      openIframe(`native://commonPay?params=${param}&callback=${funcName}`);
    } else {
      android.pay(param, funcName);
    }
  },

  //设置标题
  setTitle (title) {
    if (ios) {
      openIframe(`native://setTitleName?titleName=${title}`);
    } else {
      android.setTitleName(title);
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
  setMenu (menus) {
    if (ios) {
      if (!menus && win.WebViewJavascriptBridge) {//隐藏
        win.WebViewJavascriptBridge.callHandler('setMenu', null);
        return;
      }
      const json = menus.reduce((composed, item, index) => {
        const funcName = callbackFunc(item.menuAction);
        item.menuAction = funcName;
        composed[`item${index + 1}`] = item;
        return composed;
      }, {});
      if (win.WebViewJavascriptBridge) {
        win.WebViewJavascriptBridge.callHandler('setMenu', json);
      }
    } else {
      if (!menus) { //隐藏
        menus = [{
          menuTitle: ' ',
          menuAction: ''
        }];
      } else {
        menus.forEach((item) => {
          const funcName = callbackFunc(item.menuAction);
          item.menuAction = funcName;
        });
      }
      android.setTitleMenu(stringifyJSON(menus));
    }
  },

  /**
   * alert 提示信息
   * ios 支持回调，Android 不支持
   * @param text
   * @param callback
   */
  alert (text, callback = () => {
  }) {
    const funcName = callbackFunc(callback);
    if (ios) {
      openIframe(`native://alert?text=${text}&callback=${funcName}`);
    } else {
      android.alert(text);
    }
  },

  /**
   * 设置埋点
   * 一般设置为多次埋点即可，eventId 和 eventLabel 默认设置为一样值即可
   * @param pointEvent {once: true, eventId: '', eventLabel: ''}
   */
  buriedPoint (pointEvent) {
    const once = pointEvent.once;
    if (ios) {
      if (once) {
        openIframe(`native://buriedPoint?eventId=${pointEvent.eventId}`);
      } else {
        openIframe(`native://buriedPoint?eventId=${pointEvent.eventId}&eventLable=${pointEvent.eventLable}`);
      }
    } else {
      if (once) {
        android.buriedPointOnce(pointEvent.eventId);
      } else {
        android.buriedPoint(pointEvent.eventId, pointEvent.eventLable);
      }
    }
  },

};

export default jdWalletApp ? walletApi : walletApiDev;
