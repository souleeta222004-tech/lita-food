import React from "react";
import "../../assets/style/auth/auth.css";
import facebookIcon from "../../assets/img/facebook.png";
import googleIcon from "../../assets/img/google.png";

export default function Register({ switchToLogin }) {
  return (
    <div className="auth-card">
      <h2>Register</h2>

      <input className="auth-input" placeholder="Name" />
      <input className="auth-input" placeholder="Email" />
      <input className="auth-input" type="password" placeholder="Password" />

      <button className="auth-button">
        Register
      </button>
      

      <p className="auth-link" onClick={switchToLogin}>
        Already have account? Login
      </p>
    </div>
  );
}