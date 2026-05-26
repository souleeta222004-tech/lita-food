import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import { auditLog } from "./middlewares/auditLog.middleware.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import { protect, requireRole } from "./middlewares/auth.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import orderRoutes from "./routes/order.routes.js";


const app = express();

// ================= GLOBAL =================
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// static uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ================= API =================
const API_PREFIX = "/api/v1";

app.use(`${API_PREFIX}/auth`, authRoutes);

// admin middleware (optional chuẩn)
app.use(
  `${API_PREFIX}/admin`,
  protect,
  requireRole("admin"),
  auditLog()
);


// ================= HEALTH =================
app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

// ================= ERROR =================
app.use(notFound);
app.use(errorHandler);

export default app;