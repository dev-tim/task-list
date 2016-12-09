import webpack from 'webpack';
import config  from '../config';


const webpackConfig = {
  name: 'app',
  entry: {
  },
  output: {
    filename: '[name].js',
    path: config.dist
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },
  plugins: [
    new webpack.DefinePlugin(config.globalEnv),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'],
    alias: config.alias
  },
  module: {
    loaders: [
      {
        test: /\.woff(\?\S*)?$/, loader: "url-loader?limit=100000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?\S*)?$/, loader: "url-loader?limit=100000&mimetype=application/font-woff2"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"
      },
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer!sass'
      }
    ]
  }
};

const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js');
commonChunkPlugin.__KARMA_IGNORE__ = true;
webpackConfig.plugins.push(commonChunkPlugin);

export default webpackConfig;
