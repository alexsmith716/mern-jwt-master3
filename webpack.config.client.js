
// https://survivejs.com/webpack/styling/loading/
// https://forum.shakacode.com/t/best-practices-for-css-and-css-modules-using-webpack/799
// https://www.triplet.fi/blog/practical-guide-to-react-and-css-modules/
// https://medium.com/@aghh1504/4-four-ways-to-style-react-components-ac6f323da822

// devtool: 'inline-source-map'
// devtool: 'eval-source-map'

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: {
    app: [ path.join(__dirname, './client/index.js') ],
    vendor: [ 'react', 'react-dom' ]
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
  },

  module: {
    rules: [

      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
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
          {
            loader: 'url-loader',
            options: {
              limit:10000
            }
          }
        ]
      },

      {
        test: /\.json$/,
        use: [
          {loader: 'json-loader'}
        ]
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
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },

    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },

  devtool: 'cheap-module-source-map',

  plugins: [
    new ExtractTextPlugin('styles.css')
  ]

};
