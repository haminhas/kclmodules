// some code has been taken from the following boilerplate:
// https://github.com/christianalfoni/webpack-express-boilerplate/blob/master/server.js
import register from 'ignore-styles';
register(['.sass', '.scss']);

import express from 'express';
import webpack from 'webpack';
import expressConfig from './config/express';
import routesConfig from './config/routes';

require('./config/passport');
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
  const config = require('../webpack.config.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true, hash: false, timings: true, chunks: false, chunkModules: false, modules: false,
    },
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(__dirname + '/'));
}

expressConfig(app);
routesConfig(app);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Listening on port %s. Open up http://localhost:3000/ in your browser.', port, port);
});
