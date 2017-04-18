import webpack from 'webpack';
import path from 'path';

export default {
  // eslint 配置
  eslint: {
    emitError: true, // 验证失败，终止
    configFile: '.eslintrc'
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
        test: /\.js$/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        exclude: /node_modules/
      },
    ]
  },
  entry: {
    'jd-wallet-sdk': ['./src/index.js']
  },
  output: {
    path: path.join(__dirname, 'dist'), //打包输出目录
    filename: '[name].js' //文件名称
  },
  resolve: {
    extensions: ['', '.js']
  }
};

