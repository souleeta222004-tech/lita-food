import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import AdminRoutes from "./routes/AdminRoutes";

export default function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<AuthPage />} />

      {/* ADMIN */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}