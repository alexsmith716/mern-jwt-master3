
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackIsomorphicToolsConfig = require('./webpack.config.tools');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {

  entry: {
    app: [
      'babel-polyfill',
      'bootstrap-loader',
      path.join(__dirname, './client/index.js')
    ],
    vendor: [
      'axios',
      'react',
      'react-bootstrap',
      'react-dom',
      'react-helmet',
      'react-hot-loader',
      'react-redux',
      'react-router',
      'react-router-bootstrap',
      'react-router-config',
      'react-router-dom',
      'redux',
      'redux-form',
      'redux-thunk',
    ]
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/dist/client/'),
    publicPath: '/',
  },

  module: {
    rules: [

      /* ... */

    ]
  },

  resolve: {
    extensions: [ '*', '.js', '.jsx', ],
  },

  devtool: 'hidden-source-map',

  plugins: [

    new webpack.HotModuleReplacementPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[chunkhash].js'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
      }
    }),

    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig),

    new ExtractTextPlugin('styles.css', { allChunks: true }),
  ]

};
