module.exports = {
    plugins: [
        require('autoprefixer')
    ]
};

// PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use.

// Working with Autoprefixer is simple: 
//  just forget about vendor prefixes and write normal CSS according to the latest W3C specs. 
//  You don’t need a special language (like Sass) or remember where you must use mixins.

// Autoprefixer supports selectors (like :fullscreen and ::selection), 
//  unit function (calc()), at‑rules (@supports and @keyframes) and properties.

// Because Autoprefixer is a postprocessor for CSS, 
//  you can also use it with preprocessors such as Sass, Stylus or LESS.

// https://github.com/postcss/autoprefixer