import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import AdminRoutes from "./routes/AdminRoutes";
import StaffRoutes from "./routes/staffRoutes";
import CustomerRoutes from "./routes/customerRoutes";

export default function App() {
  return (
    <Routes>

      {/* LOGIN / REGISTER */}
      <Route path="/" element={<AuthPage />} />

      {/* ADMIN */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* STAFF */}
      <Route path="/staff/*" element={<StaffRoutes />} />

    </Routes>
  );
}