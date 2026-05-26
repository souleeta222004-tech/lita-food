import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";
//import Products from "../pages/admin/Products";
//import Orders from "../pages/admin/Orders";
//import Users from "../pages/admin/Users";
//import Analytics from "../pages/admin/Analytics";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        
        {/* default page */}
        <Route index element={<Analytics />} />
        <Route path="analytics" element={<Analytics />} />

        {/* <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} /> */}

      </Route>
    </Routes>
  );
}