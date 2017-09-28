
// https://webpack.js.org/configuration/devtool/
// https://webpack.js.org/guides/code-splitting/
// https://webpack.js.org/plugins/commons-chunk-plugin/
// https://webpack.js.org/plugins/define-plugin/

// devtool: 'inline-source-map'
// devtool: 'eval-source-map'

// https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md
// https://github.com/gaearon/react-hot-loader/tree/master/docs

// Module not found: Error: Can't resolve 'react-hot-loader/patch'

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: {
    app: [ 
      'eventsource-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      path.join(__dirname, './client/index.js') 
    ],
    vendor: [ 'react', 'react-dom' ]
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/dist/client/'),
    publicPath: '/',
  },

  module: {
    rules: [

      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /.+\.config.js/],
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
        use:[{
          loader: 'url-loader',
          options: {
            limit:10000
          }
        }]
      },

      {
        test: /\.json$/,
        use: [
          { loader: 'json-loader' },
        ]
      },

      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader' },
        ]
      }, 

      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },

  devtool: 'cheap-module-source-map',

  plugins: [

    new webpack.HotModuleReplacementPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),

    new ExtractTextPlugin('styles.css'),
  ]

};
