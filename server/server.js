import register from 'ignore-styles';
register(['.sass', '.scss']);

import express from 'express';
import webpack from 'webpack';
import expressConfig from './config/express';
import routesConfig from './config/routes';
import config from '../webpack.config.js';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import passportConfig from './config/passport';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

passportConfig();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true, hash: false, timings: true, chunks: false, chunkModules: false, modules: false,
    },
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(__dirname + '/dist'));
}

expressConfig(app);
routesConfig(app);

app.listen(process.env.PORT || 3000, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Listening on port %s. Open up http://localhost:3000/ in your browser.', port, port);
});
