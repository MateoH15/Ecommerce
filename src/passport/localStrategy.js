import { Strategy as LocalStrategy } from "passport-local";
import userRepository from "../repositories/userRepository.js";
import { createHash, isValidPassword } from "../utils/hash.js";

export const initializeLocalStrategy = (passport) => {
  passport.use(
    "register",
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const userExist = await userRepository.getUserByEmail(email);
          if (userExist)
            return done(null, false, { message: "User already exists" });

          const user = await userRepository.createUser({
            ...req.body,
            password: createHash(password),
          });
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
          const user = await userRepository.getUserByEmail(email);
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
