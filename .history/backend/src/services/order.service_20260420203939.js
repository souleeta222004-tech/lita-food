import Order from "../models/Order.js";
import Product from "../models/Product.js";

// ===== CREATE ORDER (QR / STAFF) =====
export const createOrderService = async (data, user) => {
  const { items, table, customer, note } = data;

  if (!items || items.length === 0) {
    throw new Error("Order items are required");
  }

  let totalAmount = 0;

  // validate + tính tiền
  const newItems = [];

  for (const item of items) {
    const product = await Product.findById(item.product);

    if (!product || !product.isAvailable) {
      throw new Error(`Product not available: ${item.product}`);
    }

    const price = product.price;
    const quantity = item.quantity;

    totalAmount += price * quantity;

    newItems.push({
      product: product._id,
      name: product.name,
      price,
      quantity,
    });
  }

  const order = await Order.create({
    customer,
    table,
    items: newItems,
    totalAmount,
    createdBy: user?.id || null,
    note,
  });

  return order;
};

// ===== GET ALL ORDERS (ADMIN / STAFF) =====
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
    .populate("createdBy", "name");

  if (!order) throw new Error("Order not found");

  return order;
};

// ===== UPDATE STATUS =====
export const updateOrderStatusService = async (id, status) => {
  const order = await Order.findById(id);
  if (!order) throw new Error("Order not found");

  order.status = status;
  await order.save();

  return order;
};

// ===== PAYMENT =====
export const payOrderService = async (id) => {
  const order = await Order.findById(id);
  if (!order) throw new Error("Order not found");

  if (order.paymentStatus === "paid") {
    throw new Error("Order already paid");
  }

  order.paymentStatus = "paid";
  order.status = "completed";

  await order.save();

  // 🔥 tăng soldCount (thống kê)
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { soldCount: item.quantity },
    });
  }

  return order;
};

// ===== DELETE (OPTIONAL) =====
export const deleteOrderService = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  if (!order) throw new Error("Order not found");

  return { message: "Order deleted" };
};