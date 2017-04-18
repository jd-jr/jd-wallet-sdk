# 京东钱包 sdk api 接口

## 用法
首先下载安装 jd-wallet-sdk
```npm install jd-wallet-sdk git@gitlab.cbpmgt.com:fe-team/jd-wallet-sdk.git```

### es6 写法
```javascript
import walletSdk from 'jd-wallet-sdk';
```
### es5 写法
```javascript
var walletSdk = require('jd-wallet-sdk');
```
### 页面中直接引入（待补充）


## 文档
该文档基于 gitbook 生成，详细查看[这里](http://...)

## 例子
手机端用微信扫描以下二维码，即可在钱包中查看相关例子

## 开发维护该项目
首先需要安装 Node.js 和 gulp `npm install -g gulp`

然后安装 npm 相关包 `npm install`
### 打包

```
gulp build
```

### 启动 gitbook 

```
gulp gitbook:serve
```

### 打包 gitbook 

```
gulp gitbook:build
```

打包后，把 docs/_book 发布到服务器_

### 更新例子


## 参考资料