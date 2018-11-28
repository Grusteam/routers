/* 
    Return array of file names with extension .html in specific folder 
*/

const fs = require('fs');

module.exports = function getPages(options) {
    const 
        pages = [],
        reg = /\..*$/, // check for extension 
        hasExension = options.extension && reg.test(options.extension),
        ext = hasExension ? options.extension : '.html';

    if (options.extension && !hasExension) {
        console.info('Second argument should be extension with dot like .js, .html etc');
        console.info('.html extension used as fallback');
    }

    fs.readdirSync(options.dir).forEach(file => {
        file.indexOf(ext) > -1 && pages.push(file);
    });

    return pages;
}