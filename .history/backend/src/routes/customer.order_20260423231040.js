// routes/customer.order.js
import express from "express";
import {
  createOrder,
} from "../controllers/order.controller.js";
import {
  getCustomerOrders,
} from "../controllers/customer.order.controller.js";

const router = express.Router();

router.post("/", createOrder); // guest
router.get("/", getCustomerOrders);

export default router;