import { Routes, Route } from "react-router-dom";

import AuthPage from "./pages/auth/AuthPage";
import AdminRoutes from "./routes/AdminRoutes";
import StaffRoutes from "./routes/staffRoutes";
import CustomerRoutes from "./routes/customerRoutes";

export default function App() {
  return (
    <Routes>

     <Routes>
  <Route path="/auth" element={<AuthPage />} />

  <Route path="/admin/*" element={<AdminRoutes />} />
  <Route path="/staff/*" element={<StaffRoutes />} />
  <Route path="/*" element={<CustomerRoutes />} />
</Routes>

    </Routes>
  );
}