// backend/src/routes/product.routes.js 
import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProduct,
} from "../controllers/product.controller.js";

import {
  protect,
  requireRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// ===== PUBLIC (QR MENU) =====
router.get("/", getProducts); // menu
router.get("/:id", getProductById);

// ===== ADMIN =====
router.post("/", protect, requireRole("admin"), createProduct);

router.put("/:id", protect, requireRole("admin"), updateProduct);

router.delete("/:id", protect, requireRole("admin"), deleteProduct);

router.patch(
  "/:id/toggle",
  protect,
  requireRole("admin"),
  toggleProduct
);

export default router;