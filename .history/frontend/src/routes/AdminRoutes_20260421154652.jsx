import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Analytics from "../pages/admin/Analytics";
 import Menu  from "../pages/admin/Menu";
 import Tables from "../pages/admin/tables";
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
        <Route path="menu" element={<Menu />} />
        
        {/* <Route path="orders" element={<Orders />} /> */}

      </Route>
    </Routes>
  );
}