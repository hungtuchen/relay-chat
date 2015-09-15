var path = require('path');
var webpack = require('webpack');

var resolveFromHere = path.resolve.bind(path, __dirname);
var resolveModuleDir = resolveFromHere.bind(path, 'node_modules');

module.exports = {
  devtool: '#source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    resolveFromHere('js', 'app.js'),
  ],
  output: {
    path: '/',
    filename: 'app.js',
    publicPath: '/js/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: {
      'react': resolveModuleDir('react')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          plugins: ['./build/babelRelayPlugin']
        }
      }
    ]
  }
};
