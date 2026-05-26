// src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { auditLog } from "./middlewares/auditLog.middleware.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import path from "path";

const app = express();

// ================= GLOBAL MIDDLEWARE =================
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
// cho truy cập ảnh
app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));
app.use(express.json());
app.use(morgan("dev"));

// ================= API =================
const API_PREFIX = "/api/v1";

app.use(`${API_PREFIX}/auth`, authRoutes);
//

// audit log cho admin
app.use(`${API_PREFIX}/admin`, auditLog());

// ================= HEALTH =================
app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

// ================= ERROR =================
app.use(notFound);
app.use(errorHandler);

export default app;