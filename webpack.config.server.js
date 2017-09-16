
const path = require('path');
const srcPath = path.resolve(__dirname);
const nodeExternals = require('webpack-node-externals');
var webpack = require('webpack')

module.exports = {

  context: srcPath,

  entry: {
    app: './server/index.js'
  },

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, './public'),
  },

  module: {
    rules: [{
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
          plugins: [ 'transform-object-rest-spread' ]
        }
      }]
    }]
  },

  devtool: 'source-map',

  target: 'node',

  externals: nodeExternals(),

  node: {
    __dirname: false,
    __filename: false
  }

};