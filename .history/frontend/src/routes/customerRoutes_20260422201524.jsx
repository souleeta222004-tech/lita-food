import { Routes, Route, Navigate } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";
import POScustomer from "../pages/customer/POScustomer";
import SelectTablePage from "../pages/customer/SelectTablePage";
import CustomerOrders from "../pages/customer/Order";

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>

        {/* ✅ vào web → chuyển sang menu */}
        <Route index element={<Navigate to="/menu" />} />

        <Route path="menu" element={<POScustomer />} />
         <Route path="select-table" element={<SelectTablePage />} />
        <Route path="orders" element={<CustomerOrders />} />
      </Route>
    </Routes>
  );
}