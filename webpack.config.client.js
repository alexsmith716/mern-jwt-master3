
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  entry: './client/index.js',

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './public/assets'),
    publicPath: '/assets',
  },

  module: {
    rules: [

      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
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
            loader: "url-loader",
            options: {
              limit:10000
            }
          }
        ]
      },

      {
        test: /\.json$/,
        use: [
          {loader: "json-loader"}
        ]
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: "[name]_[local]_[hash:base64:5]"
            }
          },
          {
                loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }]
        })
      },

    ]
  },

  resolve: {
    extensions: ['.js'],
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },

  plugins: [
    new ExtractTextPlugin('styles.css')
  ]

};
