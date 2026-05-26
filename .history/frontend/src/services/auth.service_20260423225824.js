//frontend/src/services/auth.service.js
import api from "./api";

// REGISTER
export const registerApi = (data) => {
  return api.post("/auth/register", data);
};

// LOGIN
export const loginApi = (data) => {
  return api.post("/auth/login", data);
};

// PROFILE (dùng cho cả staff + customer)
export const getProfileApi = () => api.get("/auth/profile");

// UPDATE PROFILE
export const updateProfileApi = (data) => api.put("/users/me", data);

