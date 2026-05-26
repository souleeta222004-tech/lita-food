import api from "./api";

// ================= GET =================
export const getOrders = (params) => {
  return api.get("/orders", { params });
};

export const updateOrderStatus = (id, status) => {
  return api.patch(`/orders/${id}/status`, { status });
};

export const payOrder = (id) => {
  return api.patch(`/orders/${id}/pay`);
};

// ================= CREATE =================

// 👤 QR CUSTOMER ORDER
export const createQrOrder = (data) => {
  return api.post("/orders/qr", data);
};

// 👨‍💼 STAFF ORDER
export const createStaffOrder = (data) => {
  return api.post("/orders/staff", data);
};

// 📱 APP USER ORDER
export const createAppOrder = (data) => {
  return api.post("/orders/app", data);
};