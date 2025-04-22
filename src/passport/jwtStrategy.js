import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

export const initializeJwtStrategy = (passport) => {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || "secret123",
      },
      (jwtPayload, done) => {
        return done(null, jwtPayload.user);
      }
    )
  );
};
