// controllers/customer.order.controller.js
import Order from "../models/Order.js";

export const getCustomerOrders = async (req, res) => {
  try {
    const { tableId, customerId } = req.query;

    if (!tableId || !customerId) {
      return res.status(400).json({
        message: "Missing tableId or customerId",
      });
    }

    const orders = await Order.find({
      table: tableId,
      customer: customerId,
    })
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    res.json({ data: orders });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};