import { Routes, Route, Navigate } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";
import POScustomer from "../pages/customer/POScustomer";
import SelectTablePage from "../pages/customer/SelectTablePage";

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>

        {/* ✅ vào web → chuyển sang menu */}
        <Route index element={<Navigate to="/menu" />} />

        <Route path="menu" element={<POScustomer />} />

        {/* sau này thêm */}
        {/* <Route path="select-table" element={<SelectTablePage />} /> */}

      </Route>
    </Routes>
  );
}