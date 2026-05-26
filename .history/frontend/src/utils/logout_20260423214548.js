export const logout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("customerId");
  localStorage.removeItem("tableId");
  localStorage.removeItem("cart");

  window.location.href = "/login";

  navigate("/");
};