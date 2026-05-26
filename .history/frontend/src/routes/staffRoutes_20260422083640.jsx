//
import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/StaffLayout";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        
        {/* default page */}
        <Route index element={<Analytics />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="menu" element={<Menu />} />
        <Route path="tables" element={<Tables />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<CustomerPage />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="more" element={<MorePage />} />
        <Route path="Invoices" element={<InvoicesPage />} />
        <Route path="payments" element={<PaymentPage />} />
      </Route>
    </Routes>
  );
}