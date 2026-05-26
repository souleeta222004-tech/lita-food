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

// PROFILE CURRENT USER (JWT)
export const getProfileApi = () => api.get("/users/me");
export const updateProfileApi = (data) => api.put("/users/me", data);