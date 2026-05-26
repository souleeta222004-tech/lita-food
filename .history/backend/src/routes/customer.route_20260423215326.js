import express from "express";
import Customer from "../models/Customer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const customer = await Customer.create({});
  res.json({ success: true, data: customer });
});

export default router;