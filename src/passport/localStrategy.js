import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import { createHash, isValidPassword } from "../utils/hash.js";

export const initializeLocalStrategy = (passport) => {
  passport.use(
    "register",
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const userExist = await User.findOne({ email });
          if (userExist)
            return done(null, false, { message: "User already exists" });

          const user = new User({
            ...req.body,
            password: createHash(password),
          });
          await user.save();
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user || !isValidPassword(user, password))
            return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
