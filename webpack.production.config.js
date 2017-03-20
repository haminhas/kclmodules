const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
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
    },{
      test: /\.css$/,
      include: /node_modules/,
      loader: 'style!css!postcss',
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
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
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
     'process.env.SESSION_SECRET': JSON.stringify(process.env.SESSION_SECRET),
     'process.env.OUTLOOK_CLIENT_ID': JSON.stringify(process.env.OUTLOOK_CLIENT_ID),
     'process.env.OUTLOOK_CLIENT_SECRET': JSON.stringify(process.env.OUTLOOK_CLIENT_SECRET),
     'process.env.API_GATEWAY_URL': JSON.stringify(process.env.API_GATEWAY_URL)
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
      require('postcss-smart-import'),
      require('autoprefixer'),
      require('precss'),
    ];
  },
  target: 'web', // Make web variables accessible to webpack, e.g. window
};
