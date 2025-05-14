import express from "express";
import passport from "passport";
import { loginUser } from "../controllers/sessionController.js";
import UserDTO from "../dtos/userDTO.js";

const router = express.Router();

router.post(
  "/register",
  passport.authenticate("register", { session: false }),
  (req, res) => {
    res.status(201).send({ message: "User registered" });
  }
);

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  loginUser
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({ user: new UserDTO(req.user) });
  }
);

export default router;
