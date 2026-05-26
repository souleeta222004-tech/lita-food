// frontend/src/services/menu.service.js
import api from "./api";

// GET ALL
export const getMenus = () => {
  return api.get("/products");
};

// CREATE
export const createMenu = (data) => {
  return api.post("/products", data);
};

// UPDATE
export const updateMenu = (id, data) => {
  return api.put(`/products/${id}`, data);
};

// DELETE
export const deleteMenu = (id) => {
  return api.delete(`/products/${id}`);
};

// TOGGLE ACTIVE
export const toggleMenu = (id) => {
  return api.patch(`/products/${id}/toggle`);
};