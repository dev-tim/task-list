/* globals process,__dirname */
const path = require('path');

const processEnv = (process.env.NODE_ENV || 'development').trim();
const WUNDER_APP_URL = (process.env.WUNDER_APP_URL || 'http://localhost:9000').trim();
const API_BASEURL = 'http://localhost:3000';

const WUNDER_APP_CLIENT_ID = process.env.WUNDER_APP_CLIENT_ID || '';
const WUNDER_APP_CLIENT_SECRET = process.env.WUNDER_APP_CLIENT_SECRET || '';

/*
 Configuration for the project and webpack setup
 */
const config = {
  env: processEnv,
  API_BASEURL,
  dist: path.join(__dirname, 'dist'),
  globalEnv: {
    NODE_ENV: processEnv,
    __DEV__: processEnv === 'development',
    __PROD__: processEnv === 'production'
  },
  styles: path.join(__dirname, 'assets'),
  alias: {
    'actions': path.join(__dirname, 'app/actions'),
    'containers': path.join(__dirname, 'app/containers'),
    'components': path.join(__dirname, 'app/components'),
    'constants': path.join(__dirname, 'app/constants'),
    'middleware': path.join(__dirname, 'app/middleware'),
    'common': path.join(__dirname, 'app/common'),
    'helpers': path.join(__dirname, 'app/common/helpers'),
    'services': path.join(__dirname, 'app/common/services'),
    'reducers': path.join(__dirname, 'app/reducers'),
    'utils': path.join(__dirname, 'app/utils'),
    'config': path.join(__dirname, 'config')
  },
  webpack: {
    publicPath: API_BASEURL
  },
  wunderlistApiUrl: 'https://a.wunderlist.com/api/v1',
  auth: {
    oauthUrl: 'https://www.wunderlist.com/oauth',
    clientId: WUNDER_APP_CLIENT_ID,
    clientSecret: WUNDER_APP_CLIENT_SECRET,
    redirectUrl: WUNDER_APP_URL
  }
};

module.exports = config;
