require('dotenv').config();

const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;

const credentials = {
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: `${process.env.API_URL}/auth/github/cb`,
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    credentials,
    async (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);
