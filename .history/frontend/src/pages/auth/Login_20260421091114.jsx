import React from 'react';
import "../../assets/styles/auth.css";
export default function Login({ switchToRegister }) {
  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input placeholder="Email" className="auth-input" />
      <input placeholder="Password" type="password" className="auth-input" />

      <button className="auth-button">
        Login
      </button>

      <p onClick={switchToRegister} className="auth-link">
        No account? Register
      </p>
    </div>
  );
}

const styles = {
  
};