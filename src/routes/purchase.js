import express from "express";
import passport from "passport";
import { purchaseCart } from "../controllers/purchaseController.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("user"),
  purchaseCart
);

export default router;
