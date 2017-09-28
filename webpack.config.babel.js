
// https://github.com/istarkov/babel-plugin-webpack-loaders
// https://github.com/istarkov/minimal-example-for-babel-plugin-webpack-loaders/blob/master/webpack.config.js
// https://webpack.js.org/loaders
// https://github.com/webpack-contrib/css-loader
// https://javascriptplayground.com/blog/2016/07/css-modules-webpack-react/

var ExtractTextPlugin = require('extract-text-webpack-plugin');
let cssModulesIdentName = '[name]__[local]__[hash:base64:5]';
// defines structure of what generated CSS class should be, maps to generated output

if (process.env.NODE_ENV === 'production') {
  //
}

module.exports = {

  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['client', 'node_modules']
  },

  module: {
    rules: [

      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]',
          'postcss-loader',
        ],
      },

      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000'
      }

    ]
  }
};