const dotenvPlugin = require('webpack-dotenv-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
    publicPath: '/'
  }, 
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loaders: ['babel'],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&importLoaders=1&localIdentName=[local]__[path][name]__[hash:base64:5]!postcss-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.svgi$/,
      loader: 'svg-inline'
    }, {
      test: /\.(png|svg)$/,
      loader: "file-loader?name=img-[hash:6].[ext]"
    }]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './app/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev'),
      'process.env.PORT': JSON.stringify('3000'),
      'process.env.API_GATEWAY_URL': JSON.stringify('http://localhost:3000')
    }),
    new ExtractTextPlugin('[name].css'),
  ],
  resolve: {
    modules: [
      'node_modules',
      'app',
    ],
    extensions: ['', '.js', '.css'],
  },
  postcss: function () {
    return [
      require('autoprefixer'),
      require('precss'),
    ];
  },
  target: 'web', // Make web variables accessible to webpack, e.g. window
};
