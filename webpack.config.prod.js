
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
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
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.join(__dirname, './public/static/dist/client'),
    publicPath: '/public/static/dist/client/'
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

    // global constants configured at compile time
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        CLIENT: JSON.stringify(true)
      }
    }),

    // creates a separate file (chunk), consisting of common modules shared between multiple entry points
    // By separating modules from bundles, the chunked file is loaded once & stored in cache for later use
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[chunkhash].js'
    }),

    // provides support for isomorphic/universal rendering
    // helps resolve require calls between Node & webpack
    // https://github.com/catamphetamine/webpack-isomorphic-tools
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig),

    // extract text from a bundle(s) into a separate file
    // https://github.com/webpack-contrib/extract-text-webpack-plugin
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true
    }),

    // plugin for generating asset manifests
    new ManifestPlugin({
      basePath: '/'
    }),

    // exports a manifest that maps entry chunk names to their output files
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
      inlineManifest: false
    }),

    //new SWPrecacheWebpackPlugin({
    //    cacheId: 'my-project-name',
    //    dontCacheBustUrlsMatching: /\.\w{8}\./,
    //    filename: 'service-worker.js',
    //    minify: true,
    //    navigateFallback: PUBLIC_PATH + 'index.html',
    //    staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    //}),

  ]
};
