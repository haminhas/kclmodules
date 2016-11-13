const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, './app/index')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'index.js',
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
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html',
    }),
    new webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin('[name].css')
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
      require('postcss-smart-import'),
      require('autoprefixer'),
      require('precss'),
    ];
  },
  target: 'web', // Make web variables accessible to webpack, e.g. window
};
