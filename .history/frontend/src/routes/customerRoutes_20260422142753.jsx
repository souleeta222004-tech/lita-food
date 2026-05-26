//
import { Routes, Route } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";


export default function StaffRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        
        <Route index element={< />} />
        
      </Route>
    </Routes>
  );
}