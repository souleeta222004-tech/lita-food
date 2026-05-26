//
import { Routes, Route } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";
import POScustomer from "../pages/customer/POScustomer";


export default function StaffRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<POScustomer />} />
        <Route path="menu" element={<POScustomer />} />
    
        
      </Route>
    </Routes>
  );
}