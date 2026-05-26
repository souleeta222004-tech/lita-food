import {
  createOrderService,
  getOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
  deleteOrderService,
} from "../services/order.service.js";


export const getOrdersByTable = async (req, res) => {
  try {
    const { table } = req.query;

    if (!table) {
      return res.status(400).json({
        success: false,
        message: "Thiếu tableId",
      });
    }

    const orders = await Order.find({ table })
      .populate("table", "name")
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// ===== CREATE ORDER =====
export const createOrder = async (req, res) => {
  try {
    const order = await createOrderService(req.body, req.user);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===== GET ALL =====
export const getOrders = async (req, res) => {
  try {
    const orders = await getOrdersService(req.query);

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===== GET DETAIL =====
export const getOrderById = async (req, res) => {
  try {
    const order = await getOrderByIdService(req.params.id);

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ===== UPDATE STATUS =====
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await updateOrderStatusService(
      req.params.id,
      status
    );

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===== DELETE =====
export const deleteOrder = async (req, res) => {
  try {
    const result = await deleteOrderService(req.params.id);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const payOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  order.paymentStatus = "paid";
  await order.save();

  res.json({ success: true, data: order });
};