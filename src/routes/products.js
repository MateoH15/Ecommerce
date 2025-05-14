import express from "express";
import passport from "passport";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin"),
  createProduct
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin"),
  updateProduct
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin"),
  deleteProduct
);

export default router;
