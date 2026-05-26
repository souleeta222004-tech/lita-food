import { useState } from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import "./assets/style/auth/auth.css";
import logoLITA from "./assets/img/LOGOLITA-preview.png";
import 

export default function App() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="auth-page">

      {/* LOGO TOP LEFT */}
      <img src={logoLITA} className="auth-logo" alt="LITA" />

      <div className={`auth-wrapper slide-container ${isRegister ? "show-register" : ""}`}>

        <div className="slide login">
          <Login switchToRegister={() => setIsRegister(true)} />
        </div>

        <div className="slide register">
          <Register switchToLogin={() => setIsRegister(false)} />
        </div>

      </div>

    </div>
  );
}