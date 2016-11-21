import { RouterContext, match } from 'react-router';
import passport from 'passport';
import routes from '../../app/Router';
import { renderToString } from 'react-dom/server';
import React from 'react';

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
    match({ routes, location: req.url }, (err, redirect, props) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (redirect) {
        res.redirect(redirect.pathname + redirect.search);
      } else if (props) {
        const appHtml = renderToString(<RouterContext {...props}/>);
        res.send(renderPage(appHtml));
      } else {
        res.status(404).send('Not Found');
      }
    });
  });

  function renderPage(appHtml) {
    return `
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,500,400italic,500italic,700,700italic' rel='stylesheet' type='text/css'>
        <!-- Make the page mobile compatible -->
        <meta name="viewport" content="target-densitydpi=device-dpi,width=device-width, initial-scale=1,user-scalable=no">
        <title>Module Amendments</title>
      </head>
      <body>
        <!-- The app hooks into this div -->
        <div id=app>${appHtml}</div>
      </body>
    </html>
   `;
  }

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
