import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import { initializePassport } from "./config/passport.js";
import sessionRoutes from "./routes/sessions.js";
import passwordRoutes from "./routes/password.js";
import productRoutes from "./routes/products.js";
import purchaseRoutes from "./routes/purchase.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
initializePassport();
app.use(passport.initialize());

app.use("/api/sessions", sessionRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/products", productRoutes);
app.use("/api/purchase", purchaseRoutes);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce")
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
