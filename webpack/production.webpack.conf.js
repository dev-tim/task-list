import baseWebpackConfig from './base.webpack.conf';

baseWebpackConfig.entry = {
  app: './app/app'
};

baseWebpackConfig.module.loaders.push({
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
});

export default baseWebpackConfig;
