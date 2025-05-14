import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userRepository from "../repositories/userRepository.js";

export const initializeJwtStrategy = (passport) => {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || "secret123",
      },
      async (jwtPayload, done) => {
        const user = await userRepository.getUserById(jwtPayload.user.id);
        if (!user) return done(null, false);
        return done(null, user);
      }
    )
  );
};
