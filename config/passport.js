const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

const GOOGLE_CLIENT_ID =
  "598504232665-vmbs578km9m7inp18285a8s2u4smgfte.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/v1/auth/google/callback",

      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ where: { accountId: profile.id } });

        if (!user) {
          user = await User.create({
            accountId: profile.id,
            accountName: profile.displayName,
            imageURL: profile.photos[0].value,
            email: profile.emails[0].value,
            loginType: profile.provider,
          });
        }

        return done(null, profile);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// passport.deserializeUser((id, done) => {
//   User.findByPk(id, (err, user) => {
//     done(err, user);
//   });
// });

module.exports = passport;
