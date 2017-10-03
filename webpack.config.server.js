
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {

  entry: path.join(__dirname, './server/server.js'),

  output: {
    filename: 'server.bundle.js',
    path: path.join(__dirname, '/dist'),
    libraryTarget: 'commonjs2'
  },

  module: {

    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],

        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['env', {'targets': { 'browsers': ['last 2 versions'] }}],
              'stage-0',
              'react'
            ],
            plugins: [
              [
                'babel-plugin-webpack-loaders', {
                  config: './webpack.config.babel.js',
                  verbose: false,
                }
              ],
            ]
          },
        }]
      },
      {
        test: /\.json$/,
        use: [{
          loader: 'json-loader',
          options: {
            /* ... */
          }
        }]

      },
    ]
  },

  target: 'node',

  externals: [ nodeExternals({ importType: 'commonjs' }) ],

  node: {
    __dirname: true,
    __filename: true,
  }
};
