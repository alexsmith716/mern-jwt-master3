
// babel-register: a require hook that binds itself to node's require 
//  and automatically transpiles on the fly

// One of the ways you can use Babel is through the require hook. The require hook
//  will bind itself to node's 'require' and automatically compile files on the fly

// All subsequent files required by node with the extensions:
//   '.es6', '.es', '.jsx', '.js' will be transformed by Babel

// Ignores `node_modules` by default

// https://babeljs.io/docs/usage/api/#options
// https://babeljs.io/docs/plugins/
// https://github.com/michalkvasnicak/babel-plugin-css-modules-transform
// https://github.com/istarkov/babel-plugin-webpack-loaders

// Babel is a compiler. At a high level, it has 3 stages that it runs code in:
// parsing, transforming, generation

// Out of the box Babel doesn’t do anything. It parses code & generates the same code back out again
// Plugins are required to do anything (affects the 2nd stage, transformation)

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