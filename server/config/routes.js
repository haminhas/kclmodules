import passport from 'passport';
import path from 'path';
import {decideSwap} from './moduleAuthoriser';
// import { getAllModules, getStudentTimetable, getStudent } from './db';

export default (app) => {
  const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { return next(); }
    return res.redirect('/');
  };

  app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });

  app.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.post('/swap', async (req, res) => {
    const response = await decideSwap(
      req.body.studentid,
      req.body.oldModule,
      req.body.newModule
    );
    res.send(response);
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
  app.get('/auth/callback', passport.authenticate('windowslive', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  });

  // send all requests to index.html so browserHistory works
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
};
