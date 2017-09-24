
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  entry: './client/index.js',

  output: {
    filename: 'bundle.js',
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
              'stage-1',
              'react'
            ]
          }
        }]

      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },

  plugins: [
    new ExtractTextPlugin('styles.css')
  ]

};
