import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Analytics from "../pages/admin/Analytics";
 import Menu  from "../pages/admin/Menu";
 import Tables from "../pages/admin/tables";
import Orders from "../pages/admin/Orders";
import CustomerPage from "../pages/admin/customer";

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
        <Route path="tables" element={<Tables />} />
        <Route path="orders" element={<Orders />} />
        

      </Route>
    </Routes>
  );
}