import { createMemoryHistory, match } from 'react-router';
import passport from 'passport';
import routes from '../../app/Router';
import pageRenderer from './pageRenderer';
import configureStore from '../../app/store';
import path from 'path';
export default (app) => {
    // const ensureAuthenticated = (req, res, next) => {
  //   if (req.isAuthenticated()) { return next(); }
  //   return res.redirect('/login');
  // };

  // app.get('/dashboard', ensureAuthenticated, (req, res) => {
  //   // res.status(200).json({ user: req.user });
  //   res.render('dashboard', { user: req.user });
  // });

  // GET /auth/outlook
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Outlook authentication will involve
  //   redirecting the user to outlook.com.  After authorization, Outlook
  //   will redirect the user back to this application at
  //   /auth/outlook/callback
  app.get('/auth',
    passport.authenticate('windowslive', { scope: [
      'openid',
      'profile',
      'offline_access',
      'https://outlook.office.com/Mail.Read'
    ]}),
    (req, res) => {
      res.send('hello');
      // The request will be redirected to Outlook for authentication, so
      // this function will not be called.
    }
  );

  // GET /auth/outlook/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/callback',
    passport.authenticate('windowslive', {
      successRedirect: '/dashboard',
      failureRedirect: '/login'
    }),
  );

  // send all requests to index.html so browserHistory works
  app.get('*', (req, res) => {
    const memoryHistory = createMemoryHistory(req.url);
    const store = configureStore(memoryHistory);

    match({ routes, location: req.url }, (err, redirect, props) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (redirect) {
        res.redirect(redirect.pathname + redirect.search);
      } else if (props) {
        const html = pageRenderer(store, props);
        res.send(html);
      } else {
        res.sendFile(path.join(__dirname, '../../dist/index.html'));
      }
    });
  });
  // app.use((req, res) => {
  //   const memoryHistory = createMemoryHistory(req.url);
  //   const store = configureStore(memoryHistory);
  //   const history = browserHistory;
  //
  //   match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
  //     if (error) {
  //       res.status(500).send(error.message);
  //     } else if (redirectLocation) {
  //       res.redirect(302, redirectLocation.pathname + redirectLocation.search);
  //     } else if (renderProps) {
  //       const html = pageRenderer(store, renderProps);
  //       res.send(html);
  //     }
  //   });
  // });
};
