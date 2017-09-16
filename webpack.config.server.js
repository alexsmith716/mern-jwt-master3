
const path = require('path');
const srcPath = path.resolve(__dirname, 'src');
const outputPath = path.resolve(__dirname, 'dist');
const nodeExternals = require('webpack-node-externals');

module.exports = {

  context: srcPath,

  entry: {
    app: './server/server.js'
  },

  output: {
    path: outputPath,
    filename: 'server.js'
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
            'react',
            'stage-1'
          ],
          plugins: ['transform-object-rest-spread']
        } 
      }]
    }]
  },

  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['*', '.js', '.jsx', '.json']
  },

  devtool: 'source-map',

  target: 'node',

  externals: nodeExternals(),

  node: {
    __dirname: false,
    __filename: false
  }

};