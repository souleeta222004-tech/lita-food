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

// CREATE ORDER
export const createOrder = (data) => {
  return api.post("/orders", data);
};

export const getCustomerOrders = () => {
  const customerId = localStorage.getItem("customerId");
  const tableId = localStorage.getItem("tableId");

  if (!customerId || !tableId) {
    return Promise.resolve({ data: { data: [] } });
  }

  return api.get(
    `/orders/customer?table=${tableId}&customer=${customerId}`
  );
};