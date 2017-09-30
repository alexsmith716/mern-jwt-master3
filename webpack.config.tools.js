
// https://github.com/catamphetamine/webpack-isomorphic-tools
// https://github.com/catamphetamine/webapp
// https://github.com/catamphetamine/webpack-isomorphic-tools#configuration

// For each asset type managed by webpack-isomorphic-tools
//  there should be a corresponding loader in your Webpack configuration.

// Use webpack-isomorphic-tools to return the real path to a image on the disk

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// style-loader (standard CSS stylesheets)

// If you aren't using "CSS modules" feature of Webpack, 
//  and if in your production Webpack config you use ExtractTextPlugin for CSS styles,
//  you can set it up

// parser: WebpackIsomorphicToolsPlugin.cssLoaderParser

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// style-loader (CSS stylesheets with "CSS modules" feature)

// If you are using "CSS modules" feature of Webpack,
//  and if in your production Webpack config you use ExtractTextPlugin for CSS styles,
//  you can set it up

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// How to place an asset into webpack-assets.json?

// Pseudocode:

// making of webpack-assets.json inside the Webpack plugin
// for each type of configuration.assets
//  modules.filter(type.filter).for_each (module)
//    assets[type.path()] = compile(type.parser(module))

// Therefore, if you get the "asset not found" error, first check your webpack-assets.json
//   and second check your webpack-isomorphic-tools configuration section for this asset type: 
//  are your filter, path and parser functions correct?


const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {

  assets: {

    /* ... */

  },

  modulesDirectories: ['node_modules'],

  patch_require: false

};

