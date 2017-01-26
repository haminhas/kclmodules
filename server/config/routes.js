import passport from 'passport';
import path from 'path';
import {decideSwap} from './moduleAuthoriser';

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

  app.get('/user', ensureAuthenticated, (req, res) => {
    return res.json(req.user.alias);
  });

  app.get('/auth/callback',
    passport.authenticate('windowslive', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/dashboard');
    });

  app.get('/auth',
    passport.authenticate('windowslive', { scope: [
      'openid',
      'profile',
      'offline_access',
      'https://outlook.office.com/Mail.Read'
    ]}),
    (req, res) => {
    }
  );

  // send all requests to index.html so browserHistory works
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
};
