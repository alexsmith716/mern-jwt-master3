
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackIsomorphicToolsConfig = require('./webpack.config.tools');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {

  entry: {
    app: [
      'babel-polyfill',
      'bootstrap-loader',
      path.join(__dirname, './client/index.js')
    ],
    vendor: [
      'axios',
      'react',
      'react-bootstrap',
      'react-dom',
      'react-helmet',
      'react-hot-loader',
      'react-redux',
      'react-router',
      'react-router-bootstrap',
      'react-router-config',
      'react-router-dom',
      'redux',
      'redux-form',
      'redux-thunk',
    ]
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
            presets: [
              ['env', {'targets': { 'browsers': ['last 2 versions'] }}],
              'stage-0',
              'react'
            ]
          }
        }]

      },

      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000, mimetype: 'application/font-woff' }
          }
        ]
      },

      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000, mimetype: 'application/octet-stream' }
          }
        ]
      },

      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          { loader: 'file-loader' }
        ]
      },

      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000, mimetype: 'image/svg+xml' }
          }
        ]
      },

      {
        test: /\.(jpe?g|gif|png)$/i,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000 }
          }
        ]
      },

      {
        test: /\.json$/,
        use: [
          { loader: 'json-loader' }
        ]
      },


      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: true
              }
            }, 
            {
              loader: 'postcss-loader',
              options: {
                config: './postcss.config.js',
                sourceMap: true,
              }
            }, 
            {
              loader: 'less-loader',
              query: {
                outputStyle: 'expanded',
                sourceMap: true
              }
            }
          ]
        })
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: true
              }
            }, 
            {
              loader: 'postcss-loader',
              options: {
                config: './postcss.config.js',
                sourceMap: true,
              }
            }, 
            {
              loader: 'sass-loader',
              query: {
                outputStyle: 'expanded',
                sourceMap: true
              }
            }
          ]
        })
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: true
              }
            }, 
            {
              loader: 'postcss-loader',
              options: {
                config: './postcss.config.js',
                sourceMap: true,
              }
            }
          ]
        })
      },
    ]
  },

  resolve: {
    extensions: [ '*', '.js', '.jsx', ],
  },

  devtool: 'hidden-source-map',

  plugins: [

    new webpack.HotModuleReplacementPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[chunkhash].js'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
      }
    }),

    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig),

    new ExtractTextPlugin('styles.css', { allChunks: true }),
  ]

};
