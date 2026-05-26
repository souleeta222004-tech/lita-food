// frontend/src/services/category.service.js
import api from "./api";

export const getCategories = () => {
  return api.get("/categories");
};