//
import { Routes, Route } from "react-router-dom";

import CustomerLayout from "../layouts/StaffLayout";


export default function StaffRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StaffLayout />}>
        
        <Route index element={<POS />} />
        
      </Route>
    </Routes>
  );
}