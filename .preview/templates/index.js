const fs = require('fs');
const template = require('lodash/template');

const html = fs.readFileSync(`${__dirname}/index.html`, 'utf8');
const render = template(html);

// can only load index.html for now
module.exports = render;
