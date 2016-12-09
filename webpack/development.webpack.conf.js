import webpack from 'webpack';
import baseWebpackConfig from './base.webpack.conf';

baseWebpackConfig.devtool = 'eval-source-map';

baseWebpackConfig.entry = {
  app: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './app/app'
  ]
};

baseWebpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);

baseWebpackConfig.module.loaders.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loaders: ['babel-loader']
});
export default baseWebpackConfig;
