//
import { Routes, Route } from "react-router-dom";

import StaffLayout from "../layouts/StaffLayout"; // ✅ đúng tên

import Analytics from "../pages/staff/Analytics";

export default function StaffRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StaffLayout />}>
        
        <Route index element={<Analytics />} />
        <Route path="analytics" element={<Analytics />} />

      </Route>
    </Routes>
  );
}