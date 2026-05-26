//frontend/src/pages/auth/Login.jsx
import React from "react";
import "../../assets/style/auth/auth.css";
import facebookIcon from "../../assets/img/facebook.png";
import googleIcon from "../../assets/img/google.png";
import { loginApi } from "../../services/auth.service";

export default function Login({ switchToRegister }) {
  return (
    <div className="auth-card">
      <h2>Login</h2>

      <input className="auth-input" placeholder="Email" />
      <input className="auth-input" type="password" placeholder="Password" />

      <button className="auth-button">
        Login
      </button>

      <div className="auth-social">
        <div className="social-btn">
          <img src={facebookIcon} alt="Facebook" />
          <span>Facebook</span>
        </div>
        <div className="social-btn">
          <img src={googleIcon} alt="Google" />
          <span>Google</span>
        </div>
      </div>

      <p className="auth-link" onClick={switchToRegister}>
        No account? Register
      </p>

      
    </div>
  );
}