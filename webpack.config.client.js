
const path = require('path');
const webpack = require('webpack');

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
            ],
            plugins: ['transform-object-rest-spread', 'async-to-promises']
          }
        }]

      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      }

    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './',
  }
};
