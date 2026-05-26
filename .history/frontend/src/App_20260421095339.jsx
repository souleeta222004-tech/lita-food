import { useState } from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import "./assets/style/auth/auth.css";
import logoLITA "../assets/img/logo.png";

export default function App() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="auth-page">

      <div className={`auth-wrapper slide-container ${isRegister ? "show-register" : ""}`}>

        {/* LOGIN */}
        <div className="slide login">
          <Login switchToRegister={() => setIsRegister(true)} />
        </div>

        {/* REGISTER */}
        <div className="slide register">
          <Register switchToLogin={() => setIsRegister(false)} />
        </div>

      </div>

    </div>
  );
}