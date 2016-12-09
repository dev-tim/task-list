//  enable runtime transpilation to use ES6/7 in node
var fs = require('fs');
var path = require('path');
var babelrc = fs.readFileSync(path.join(__dirname, '.babelrc'));
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('ERROR: Error parsing .babelrc.', err);
}

require('babel-register')(config);
