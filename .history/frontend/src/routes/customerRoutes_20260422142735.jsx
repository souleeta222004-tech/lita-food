//
import { Routes, Route } from "react-router-dom";

import CustomerLayout from "../layouts/";


export default function StaffRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StaffLayout />}>
        
        <Route index element={<POS />} />
        
      </Route>
    </Routes>
  );
}