
// https://github.com/catamphetamine/universal-webpack
// https://github.com/catamphetamine/webpack-isomorphic-tools

// webpack-isomorphic-tools is a small helper module 
//  providing basic support for isomorphic (universal) rendering when using Webpack 
//  (this is an alternative solution to using Webpack's officially recommended target: "node" approach).

// A Webpack application will usually crash when tried to be run in Node.js:
//  (you'll get a lot of SyntaxErrors with Unexpected tokens).

// The reason is that Webpack introduces its own layer above the standard javascript. 
// This extra layer handles all require() calls magically resolving them to whatever it is configured to.

// "webpack-isomorphic-tools" injects that require() layer above the standard javascript in Node.js.

// An alternative solution exists now:
//  to compile server-side code with Webpack the same way it already compiles the client-side code. 

// This is the officially recommended way to go and one can use universal-webpack library to achieve that. 
//  However, some people still prefer this (earlier) library, so it still exists.

// webpack-isomorphic-tools mimics Webpack's require() 
//  when running application code on a Node.js server without Webpack. 
//  It basically fixes all those require()s of assets and makes them work instead of throwing SyntaxErrors. 
//  It doesn't provide all the capabilities of Webpack (plugins)

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
// equal to your Webpack configuration "context" parameter
const projectBasePath = require('path').resolve(__dirname, './');

require('babel-register')({
  plugins: [
    [
      'babel-plugin-webpack-loaders', {
        config: './webpack.config.babel.js',
        verbose: true
      }
    ],
  ]
});

require('babel-polyfill');
require('./server/server');

// "global.webpackIsomorphicTools" used later in app middleware

if (process.env.NODE_ENV === 'production') {

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack.config.tools'))

  .server(projectBasePath, () => {

    require('./dist/server.bundle');

  });

} else {

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack.config.tools'))

  .server(projectBasePath, () => {

    require('./server/server');

  });

};



