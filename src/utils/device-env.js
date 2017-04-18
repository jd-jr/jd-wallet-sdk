let win = window;
const ua = win.navigator.userAgent;

let deviceEnv = {
  wx: ua.search(/micromessenger/ig) !== -1, // 微信
  ios: ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1, // ios 系统
  android: ua.indexOf('Android') !== -1, // Android 系统
  jdWalletApp: ua.indexOf('WalletClient') !== -1, // 京东钱包 app
  jdapp: ua.indexOf('jdapp') !== -1, // 京东 app
  mjd: location.pathname.indexOf('share/jr') !== -1, // FIXME 待确定

  // 返回设备名称
  getDeviceName() {
    if (this.android) {
      return 'android';
    } else if (this.ios) {
      return 'ios';
    }
    return 'android';
  }
}

export default deviceEnv;
