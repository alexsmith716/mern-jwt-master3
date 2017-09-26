
// https://webpack.js.org/configuration/externals/
// https://webpack.js.org/loaders/
// https://webpack.js.org/plugins/
// https://webpack.js.org/guides/hot-module-replacement
// https://github.com/gajus/babel-plugin-react-css-modules

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
            presets: [
              ['env', {'targets': { 'browsers': ['last 2 versions'] }}],
              'stage-2',
              'react'
            ],
            plugins: [
              [
                'css-modules-transform', {
                  'preprocessCss': './loaders/sass-loader.js',
                  'generateScopedName': '[name]_[local]_[hash:base64:5]',
                  'extensions': ['.scss']
                }
              ]
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

  resolve: {
    modules: [
      'node_modules',
      'client',
    ],
    extensions: ['.js'],
  },

  target: 'node',

  externals: nodeExternals(),

  node: {
    __dirname: true,
    __filename: true,
  }
};


