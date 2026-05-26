import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Analytics from "../pages/admin/Analytics";
// import Products from "../pages/admin/Products";
// import Orders from "../pages/admin/Orders";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        
        {/* default page */}
        <Route index element={<Analytics />} />
        <Route path="analytics" element={<Analytics />} />

        {/* future */}
        {/* <Route path="products" element={<Products />} /> */}
        {/* <Route path="orders" element={<Orders />} /> */}

      </Route>
    </Routes>
  );
}