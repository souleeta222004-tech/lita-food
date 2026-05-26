import React from "react";
import "../../assets/style/auth/auth.css";
import facebookIcon from "../../assets/img/facebook.png";
import googleIcon from "../../assets/img/google.png";

export default function Login({ switchToRegister }) {
  return (
    <div className="auth-card">
      <h2>Login</h2>

      <input className="auth-input" placeholder="Email" />
      <input className="auth-input" type="password" placeholder="Password" />

      <button className="auth-button">
        Login
      </button>
      

      <p className="auth-link" onClick={switchToRegister}>
        No account? Register
      </p>
    </div>
  );
}