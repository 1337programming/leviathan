/**
 * This is the webpack loaders file, all file extensions have to be loaded separately with the corresponding compiler
 * For example TypeScript requires the TypeScript compiler, SCSS requires the Sass compiler for conversion to css.
 */
const path = require('path');

module.exports = [
  {
    test: /\.tsx?$/,
    loader: 'ts',
    exclude: [
      //node_modules\/(?!(ng2-.+))/
    ]
  }, {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff&name=[name].[ext]'
  }, {
    test: /\.(ttf|eot|svg|jpeg|jpg|gif|png|txt)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader?name=[name].[ext]'
  }, {
    test: /\.mp4$/,
    loader: 'file-loader?name=[name].[ext]'
  }, {
    test: /\.scss$/,
    loader: 'style!css!sass?outputStyle=expanded&includePaths[]=' + path.join('node_modules/compass-mixins/lib')
  }, {
    test: /\.css$/,
    loader: 'style!css'
  }, {
    test: /\.html$/,
    loader: 'raw-loader'
  }, {
    test: /\.less$/,
    loader: 'style!css!less'
  }, {
    test: /\.json$/,
    loader: 'json-loader'
  }, {
    test: /\.js$/,
    loader: 'imports?define=>false'
  }
];
