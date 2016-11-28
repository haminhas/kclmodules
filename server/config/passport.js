import passport from 'passport';
const OutlookStrategy = require('passport-outlook').Strategy;

export default () => {
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
    clientID: process.env.OUTLOOK_CLIENT_ID,
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
    callbackURL: `${process.env.API_GATEWAY_URL}/auth/callback`,
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
};
