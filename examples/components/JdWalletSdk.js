import React, {Component} from 'react';
import JdWalletSdkList from './JdWalletSdkList';

class JdWalletSdk extends Component {

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1>京东钱包 sdk api 接口例子</h1>
            <p>
              演示各接口例子，请打开
              <a href="http://172.25.47.49/pux/codemonkey/qrcode/" target="_blank">
                http://172.25.47.49/pux/codemonkey/qrcode/
              </a>
              生成该例子在钱包中可以打开的二维码，然后用微信扫码打开，进入钱包即可测试该例子
            </p>
          </div>
        </div>
        <JdWalletSdkList/>
      </div>
    );
  }
}

export default JdWalletSdk;
