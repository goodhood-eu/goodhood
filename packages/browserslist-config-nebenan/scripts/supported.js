const browserslist = require('browserslist');
const config = require('../index');

console.log(browserslist(config).join('\n'));
