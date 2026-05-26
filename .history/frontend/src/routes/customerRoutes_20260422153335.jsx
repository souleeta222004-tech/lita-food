//
import { Routes, Route } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";
import Profile from "../pages/staff/profile";
import POS


export default function StaffRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} />
    
        
      </Route>
    </Routes>
  );
}