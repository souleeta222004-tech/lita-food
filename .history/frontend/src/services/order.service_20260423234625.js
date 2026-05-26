// frontend/src/services/order.service.js
import api from "./api";

// GET ALL
export const getOrders = (params) => {
  return api.get("/orders", { params });
};

// UPDATE STATUS
export const updateOrderStatus = (id, status) => {
  return api.patch(`/orders/${id}/status`, { status });
};

// (optional) PAY
export const payOrder = (id) => {
  return api.patch(`/orders/${id}/pay`);

};