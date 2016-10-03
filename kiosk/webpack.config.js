/**
 * Webpack Configuration File
 * This is the core piece to our platform, webpack handles the bundling of our application so we
 * can serve and build for deployments or development.
 */
var config = module.exports = {};
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackBrowserPlugin = require('webpack-browser-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var path = require('path');
var argv = require('yargs').argv;
var DevOpsConfig = require('../config.json').node_server.server_config;

var PROD = false;
if (argv.prod) {
  PROD = true;
}
config.plugins = [];
if (argv.browser) {
  config.plugins.push(new WebpackBrowserPlugin());
}
config.plugins.push(new webpack.DefinePlugin({
  WEBPACK_APIENDPOINT: JSON.stringify(DevOpsConfig.endpoint + ':' + DevOpsConfig.port),
  WEBPACK_PROD: PROD
}));
if (argv.prod) {
  config.plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'app/index.html')
  }));
  config.plugins.push(new FaviconsWebpackPlugin(path.resolve(__dirname, 'app/images/tmobile-logo.png')));
  /*
   @TODO figure out why Uglify doesn't work
   config.plugins.push(new webpack.optimize.UglifyJsPlugin({
   minimize: true,
   compress: true,
   output: {
   comments: false
   }
   }));
   */
}
/*
 @TODO Doesn't work with testing
 config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
 name: ['app', 'vendor', 'polyfill', 'head']
 }));*/

config.debug = !!argv.debug;
config.context = __dirname;
config.devtool = 'source-map';

config.devServer = {
  historyApiFallback: true,
  port: 9000,
  contentBase: path.join('./app/')
};

config.node = {
  fs: 'empty'
};
config.entry = require('./webpack/input');
config.output = require('./webpack/output');

config.resolve = {
  alias: {
    'es6-shim': path.join(__dirname, '/node_modules/es6-shim/es6-shim.js')
  },
  root: __dirname,
  extensions: ['', '.ts', '.tsx', '.js', '.json', '.html']
};

config.resolveLoader = {
  root: path.join(__dirname, 'node_modules')
};

config.module = {};
config.module.loaders = require('./webpack/loaders');
config.module.preLoaders = require('./webpack/preloaders');
config.tslint = {
  configuration: require('./tslint.json'),
  emitErrors: false
};
