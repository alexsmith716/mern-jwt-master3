
const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {

  entry: {
    app: './server/server.js'
  },

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, './public'),
    libraryTarget: 'commonjs2'
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
            plugins: [
              [
                'css-modules-transform', {
                  'generateScopedName': '[name]_[local]_[hash:base64:5]'
                }
              ]
            ]
          }
        }]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  target: 'node',

  externals: nodeExternals(),

  node: {
    __dirname: true,
    __filename: true,
  }
};


