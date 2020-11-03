const browserslist = require('browserslist');
const config = require('../index');

try {
  browserslist(config);
} catch (e) {
  console.error(e);
  process.exit(1);
}
