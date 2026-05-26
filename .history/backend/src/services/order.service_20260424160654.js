import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Table from "../models/Table.js";

// ===== CREATE ORDER (QR / STAFF) =====
export const createOrderService = async ({
  items,
  table,
  customer = null,
  guestName = null,
  note = "",
  source = "staff",
  user = null,
}) => {
  if (!["staff", "qr", "app"].includes(source)) {
  throw new Error("Invalid order source");
}

if (!items?.length) {
  throw new Error("Order items are required");
}

const tableDoc = await Table.findById(table);
if (!tableDoc) throw new Error("Table not found");

  let totalAmount = 0;
  const newItems = [];

  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product?.isAvailable) {
      throw new Error(`Product not available`);
    }

    const quantity = item.quantity;
    if (quantity <= 0) throw new Error("Invalid quantity");

    if (source === "staff") {
  if (!guestName) {
    throw new Error("Guest name is required for staff order");
  }
}

    totalAmount += product.price * quantity;

    newItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity,
    });
  }

  const order = await Order.create({
    customer,
    table,
    items: newItems,
    totalAmount,
    note,
    source,
    createdBy: user?._id || null,
  });

  // 🔥 chỉ QR và APP mới auto occupy bàn
  if (source === "qr" || source === "app") {
  tableDoc.status = "occupied";
  await tableDoc.save();
}

  return Order.findById(order._id)
    .populate("table")
    .populate("createdBy", "name")
    .populate("items.product", "name price image");
};

// ===== GET ALL ORDERS =====
export const getOrdersService = async (query) => {
  const { status, paymentStatus } = query;

  let filter = {};

  if (status) filter.status = status;
  if (paymentStatus) filter.paymentStatus = paymentStatus;

  return await Order.find(filter)
    .populate("table")
    .populate("createdBy", "name")
    .sort({ createdAt: -1 });
};

// ===== GET ORDER DETAIL =====
export const getOrderByIdService = async (id) => {
  const order = await Order.findById(id)
    .populate("table")
    .populate("createdBy", "name")
    .populate("items.product", "name price image");

  if (!order) throw new Error("Order not found");

  return order;
};

// ===== UPDATE STATUS =====
export const updateOrderStatusService = async (id, status) => {
  const validStatus = [
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "completed",
    "cancelled",
  ];

  if (!validStatus.includes(status)) {
    throw new Error("Invalid status");
  }

  const order = await Order.findById(id);
  if (!order) throw new Error("Order not found");

  order.status = status;
  await order.save();

  return order;
};

// ===== DELETE ORDER =====
export const deleteOrderService = async (id) => {
  const order = await Order.findByIdAndDelete(id);

  if (!order) throw new Error("Order not found");

  // 🔥 nếu xóa order → có thể reset bàn
  const table = await Table.findById(order.table);

  if (table) {
    table.status = "available";
    await table.save();
  }

  return { message: "Order deleted" };
};