
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
        test: /\.(js)$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-1'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
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
