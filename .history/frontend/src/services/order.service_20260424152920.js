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
export const createOrder = (data) => {
  return api.post("/orders", data);
};
