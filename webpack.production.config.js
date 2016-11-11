const dotenvPlugin = require('webpack-dotenv-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'whatwg-fetch',
    'babel-polyfill',
    './app/index',
  ],
  output: { // Compile into js/build.js
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'index.js',
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
    new HtmlWebpackPlugin({
      template: './app/index.html',
    }),
    new ExtractTextPlugin('[name].css'),
    new dotenvPlugin({
      sample: './.env.example',
      path: './.env'
    })
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
