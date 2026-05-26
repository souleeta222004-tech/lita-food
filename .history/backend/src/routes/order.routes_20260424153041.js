import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  payOrder,
  createStaffOrder,
  createQrOrder,
  createAppOrder,
} from "../controllers/order.controller.js";

import {
  protect,
  requireRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// ================= CREATE ORDER =================
// CUSTOMER QR + STAFF + APP → dùng chung 1 API
router.post("/", createOrder);

router.post("/staff", createStaffOrder);
router.post("/qr", createQrOrder);
router.post("/app", createAppOrder);

// ================= GET ORDERS (STAFF / ADMIN) =================
router.get(
  "/",
  protect,
  requireRole("admin", "staff"),
  getOrders
);

// ================= GET DETAIL =================
router.get(
  "/:id",
  protect,
  requireRole("admin", "staff"),
  getOrderById
);

// ================= UPDATE STATUS =================
router.patch(
  "/:id/status",
  protect,
  requireRole("admin", "staff"),
  updateOrderStatus
);

// ================= PAYMENT =================
router.patch(
  "/:id/pay",
  protect,
  requireRole("admin", "staff"),
  payOrder
);

// ================= DELETE =================
router.delete(
  "/:id",
  protect,
  requireRole("admin"),
  deleteOrder
);

export default router;