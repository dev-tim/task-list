var webpack = require('webpack');
var appConfig = require('./config');

module.exports = function (karmaConfig) {
  karmaConfig.set({

    browsers: ['PhantomJS'],

    singleRun: true,

    frameworks: ['mocha', 'sinon-chai'],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './node_modules/babel-polyfill/dist/polyfill.js',
      './app/**/*.spec.js'
    ],

    preprocessors: {
      './app/**/*.js': ['webpack', 'sourcemap']
    },

    reporters: ['spec'],

    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-mocha-reporter"),
      require("karma-spec-reporter"),
      require("karma-phantomjs-launcher"),
      require("karma-chrome-launcher"),
      require("karma-sourcemap-loader"),
      require("karma-sinon-chai")
    ],

    client: {
      mocha: {
        timeout: '5000'
      }
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: {limit: 10240}},
          {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
          {test: /\.json$/, loader: 'json-loader'},
          {
            test: /\.scss$/,
            loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
          }
        ]
      },
      externals: {
        fs: '{}',
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      resolve: {
        modulesDirectories: [
          'app',
          'node_modules'
        ],
        extensions: ['', '.json', '.js'],
        alias: appConfig.alias
      },
      plugins: [
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.DefinePlugin({
          __DEV__: true,
          __PROD__: false
        })
      ]

    },

    webpackServer: {
      noInfo: true
    }
  });
};
