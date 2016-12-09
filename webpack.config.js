require('./babel-init-server');

const config  = require('./config');
console.log(`Webpack is running in ${config.env} mode`);
const webpackConfig = require('./webpack/' + config.env + '.webpack.conf');
webpackConfig.context = __dirname;
module.exports = webpackConfig;
