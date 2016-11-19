import { createMemoryHistory, match } from 'react-router';
import passport from 'passport';
import configureStore from '../../app/store';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from '../../app/Router';
import pageRenderer from './pageRenderer';
export default (app) => {
  const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { return next(); }
    return res.redirect('/login');
  };

  app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.status(200).json({ user: req.user });
  });

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

  app.use((req, res) => {
    const memoryHistory = createMemoryHistory(req.url);
    const store = configureStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);

    match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const html = pageRenderer(store, renderProps);
        res.send(html);
      }
    });
  });
};
