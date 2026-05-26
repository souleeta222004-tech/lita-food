import { Routes, Route, Navigate } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";
import POScustomer from "../pages/customer/POScustomer";
// import SelectTablePage from "../pages/customer/SelectTablePage"; (sẽ làm sau)

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        
        {/* 👉 vào web sẽ vào menu */}
        <Route index element={<Navigate to="/" />} />

        <Route path="menu" element={<POScustomer />} />

        {/* 👉 chuẩn bị cho flow không QR */}
        {/* <Route path="select-table" element={<SelectTablePage />} /> */}

      </Route>
    </Routes>
  );
}