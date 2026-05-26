//
import { Routes, Route } from "react-router-dom";

import StaffLayout from "../layouts/StaffLayout";
import Analytics from "../pages/admin"; 


export default function StaffRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StaffLayout />}>
        

      </Route>
    </Routes>
  );
}