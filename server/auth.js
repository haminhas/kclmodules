const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const OutlookStrategy = require('passport-outlook').Strategy;

const OUTLOOK_CLIENT_ID = '--insert-outlook-client-id-here--';
const OUTLOOK_CLIENT_SECRET = '--insert-outlook-client-secret-here--';

import app from '../../server.js';

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Outlook profile is
//   serialized and deserialized.
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});


// Use the OutlookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Outlook
//   profile), and invoke a callback with a user object.
passport.use(new OutlookStrategy({
  clientID: OUTLOOK_CLIENT_ID,
  clientSecret: OUTLOOK_CLIENT_SECRET,
  callbackURL: 'http://www.example.com/auth/outlook/callback'
},
  (accessToken, refreshToken, profile, done) => {
    // asynchronous verification, for effect...
    process.nextTick(() => {
      // To keep the example simple, the user's Outlook profile is returned
      // to represent the logged-in user.  In a typical application, you would
      // want to associate the Outlook account with a user record in your
      // database, and return that user instead.
      return done(null, profile);
    });
  }
));

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  return res.redirect('/login');
};

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account', { user: req.user });
});

app.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

// GET /auth/outlook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Outlook authentication will involve
//   redirecting the user to outlook.com.  After authorization, Outlook
//   will redirect the user back to this application at
//   /auth/outlook/callback
app.get('/auth/outlook',
  passport.authenticate('windowslive', { scope: [
    'openid',
    'profile',
    'offline_access',
    'https://outlook.office.com/Mail.Read'
  ] }),
  (req, res) => {
    // The request will be redirected to Outlook for authentication, so
    // this function will not be called.
  });

// GET /auth/outlook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/outlook/callback',
  passport.authenticate('windowslive', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
