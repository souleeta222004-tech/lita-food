import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import AdminRoutes from "./routes/AdminRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}