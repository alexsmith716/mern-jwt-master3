
// devtool: 'inline-source-map'
// devtool: 'eval-source-map'

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackIsomorphicToolsConfig = require('./webpack.config.tools');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

// let cssnext = require('postcss-cssnext');
// let postcssFocus = require('postcss-focus');
// let postcssReporter = require('postcss-reporter');
// let cssnano = require('cssnano');

module.exports = {

  entry: {
    app: [ 
      path.join(__dirname, './client/index.js'), 
    ],
    vendor: [ 'react', 'react-dom', 'bootstrap-loader', ]
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/dist/client/'),
    publicPath: '/',
  },

  module: {
    rules: [

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['env', {'targets': { 'browsers': ['last 2 versions'] }}],
              'stage-2',
              'react'
            ]
          }
        }]

      },

      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use:[
          { loader: 'url-loader', options: { limit:10000 } }
        ]
      },

      {
        test: /\.json$/,
        use: [
          { loader: 'json-loader' }
        ]
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]_[local]_[hash:base64:5]'
              }
            },
            { loader: 'postcss-loader' }
          ]
        })
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]_[local]_[hash:base64:5]'
              }
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ]
        })
      },

    ]
  },

  resolve: {
    extensions: [ '*', '.js', '.jsx', ],
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: [

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[hash].js'
    }),

    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig),

    new ExtractTextPlugin('styles.css'),
  ]

};
