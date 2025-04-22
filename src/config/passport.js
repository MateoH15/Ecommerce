import passport from "passport";
import { initializeLocalStrategy } from "../passport/localStrategy.js";
import { initializeJwtStrategy } from "../passport/jwtStrategy.js";

export const initializePassport = () => {
  initializeLocalStrategy(passport);
  initializeJwtStrategy(passport);
};
