import api from "./api";

// tạo customer
export const createCustomer = () =>
  api.post("/customers");

// lấy orders
export const getCustomerOrders = (tableId, customerId) =>
  api.get("/customer/orders", {
    params: { tableId, customerId },
  });

// tạo order
export const createCustomerOrder = (data) =>
  api.post("/customer/orders", data);