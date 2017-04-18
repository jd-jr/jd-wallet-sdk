import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import opn from 'opn';
import baseConfig from './webpack.config.babel';
import exampleConfig from './webpack.config.example.babel';

const {webpackConfig, ip, port} = exampleConfig;
const $ = gulpLoadPlugins();

function compiler(config, callback) {
  const compiler = webpack(config);
  // run webpack
  compiler.run((err, stats) => {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }
    $.util.log('[webpack]', stats.toString({
      colors: true
    }));

    if (callback) {
      return callback();
    }
  });
}

//清理临时和打包目录
gulp.task('clean', () => {
  return gulp.src(['dist', 'lib'])
    .pipe($.clean({force: true}));
});

gulp.task('build:lib', () => {
  return gulp.src('src/**/*')
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('lib'));
});

// 用webpack 打包编译
/*eslint-disable camelcase*/
gulp.task('webpack', () => {
  let config = Object.create(baseConfig);
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ];
  compiler(config, () => {
    let config = Object.create(baseConfig);
    config.plugins = [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          screw_ie8: true,
          warnings: false
        }
      })
    ];
    config.output.filename = '[name].min.js';
    compiler(config);
  })
});

//先清理再打包
gulp.task('build:pre', ['build:lib', 'webpack']);
gulp.task('build', ['clean'], () => {
  gulp.start('build:pre');
});

//gitbook
gulp.task('gitbook:clean', () => {
  return gulp.src(['docs/_book'])
    .pipe($.clean({force: true}));
});

gulp.task('gitbook:install', () => {
  return $.run('cd docs && gitbook install').exec();
});

gulp.task('gitbook:serve', ['gitbook:install'], () => {
  return $.run('cd docs && gitbook serve').exec();
});

gulp.task('gitbook:build', ['gitbook:clean', 'gitbook:install'], () => {
  return $.run('cd docs && gitbook build').exec();
});

//example
gulp.task('example', () => {
  // Start a webpack-dev-server
  const compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler, webpackConfig.devServer)
    .listen(port, ip, (err) => {
      if (err) {
        throw new $.util.PluginError('webpack-dev-server', err);
      }
      // Server listening
      $.util.log('[webpack-dev-server]', `http://${ip}:${port}/`);

      // keep the server alive or continue?
      opn(port === '80' ? `http://${ip}` : `http://${ip}:${port}/`, {app: 'chrome'});
    });

});

//默认任务
gulp.task('default', () => {
  gulp.start('build');
  gulp.start('gitbook:build');
});
