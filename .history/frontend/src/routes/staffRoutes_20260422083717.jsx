//
import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/StaffLayout";

export default function StaffRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StaffLayout />}>
        
        {/* default page */}
        <Route index element={<Analytics />} />
        <Route path="analytics" element={<Analytics />} />
      
        <Route path="orders" element={<Orders />} />
        
        <Route path="Invoices" element={<InvoicesPage />} />

      </Route>
    </Routes>
  );
}