
const sass = require('node-sass');

module.exports = (data, file) => {

    try {
        return sass.renderSync({data, file}).css.toString('utf8');
    } catch (e) {
        console.error(e);
    }

};

// Node-sass is a library that provides binding for Node.js to LibSass, 
//  the C version of the popular stylesheet preprocessor, Sass.

// It allows you to natively compile .scss files to css at incredible speed and automatically via a connect middleware.
