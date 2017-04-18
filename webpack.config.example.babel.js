import path from 'path';
import webpack from 'webpack';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';

const ip = 'jd.wallet.sdk';
const port = 9090;
const hotDevServer = 'webpack/hot/dev-server';
// https://github.com/webpack/webpack-dev-server
// 需要在 host 文件中加入 127.0.0.1 jd.wallet.sdk
const webpackDevServer = `webpack-dev-server/client?http://${ip}:${port}`;

const appPath = path.resolve(__dirname, 'examples');

let webpackConfig = {
  // eslint 配置
  eslint: {
    emitError: true, // 验证失败，终止
    configFile: '.eslintrc'
  },
  cache: true,
  debug: true,
  devtool: 'source-map', //生成 source map文件
  stats: {
    colors: true,
    reasons: true
  },
  devServer: {
    contentBase: './examples',
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    quiet: false, // 设为true，不把任何信息输出到控制台
    publicPath: '/'
  },

  resolve: {
    root: [appPath], // 设置要加载模块根路径，该路径必须是绝对路径
    //自动扩展文件后缀名
    extensions: ['', '.js', '.jsx', '.css']
  },

  // 入口文件 让webpack用哪个文件作为项目的入口
  entry: {
    index: ['./examples/index.js', webpackDevServer, hotDevServer]
  },

  // 出口 让webpack把处理完成的文件放在哪里
  output: {
    path: path.resolve(__dirname, 'examples/dist'), //打包输出目录
    filename: '[name].bundle.js', //文件名称
    publicPath: './' //资源路径
  },

  module: {
    // https://github.com/MoOx/eslint-loader
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules.*/,
      loader: 'eslint'
    }],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        exclude: /node_modules/,
        cacheDirectory: true // 开启缓存
      },
      // https://github.com/webpack/extract-text-webpack-plugin 单独引入css文件
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(), //
    new webpack.HotModuleReplacementPlugin(), // 热部署替换模块
    new webpack.NoErrorsPlugin(), //

    new ExtractTextPlugin('[name].[hash].css', {
      disable: false,
      allChunks: true
    }),

    new HtmlwebpackPlugin({
      title: '京东钱包 sdk api 例子',
      template: path.resolve(appPath, 'templates/layout.html'),
      filename: 'index.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['index'],
      //要把script插入到标签里
      inject: 'body'
    })
  ]
};

export default {
  webpackConfig,
  ip,
  port
};
