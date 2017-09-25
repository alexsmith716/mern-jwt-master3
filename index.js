
// babel-register: a require hook that binds itself to node's require and automatically transpiles on the fly
// dev use only

require('babel-register')({

  'plugins': [
    [
      'css-modules-transform', {
        'preprocessCss': './loaders/sass-loader.js',
        'generateScopedName': '[name]_[local]_[hash:base64:5]',
        'extensions': ['.scss']
      }
    ]
  ]

});

require('babel-polyfill');
require('./server/server');