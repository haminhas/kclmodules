// import passport from 'passport';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cookieSession from 'cookie-session';

export default (app) => {
  app.use(compress());
  app.use(cookieParser());
  app.use(cookieSession({
    key: 'kclmodules.com',
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 2678400000 // 31 days
    },
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());
  const sessionStore = null;

  const sess = {
    resave: false,
    saveUninitialized: false,
    proxy: true, // The "X-Forwarded-Proto" header will be used.
    name: 'sessionId',
      // Add HTTPOnly, Secure attributes on Session Cookie
      // If secure is set, and you access your site over HTTP, the cookie will not be set
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: sessionStore
  };

  console.log('--------------------------');
  console.log('===> 😊  Starting Server . . .');
  console.log(`===>  Environment: ${process.env.NODE_ENV}`);
  console.log(`===>  Listening on port: ${app.get(process.env.PORT)}`);
  if (process.env.NODE_ENV  === 'production') {
    sess.cookie.secure = true; // Serve secure cookies
  }
  console.log('--------------------------');

  app.use(session(sess));

  app.use(passport.initialize());
  app.use(passport.session());
};
