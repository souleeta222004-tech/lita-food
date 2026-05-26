import React from 'react';
import "../../assets/styles/auth.css";
export default function Login({ switchToRegister }) {
  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input placeholder="Email" style={styles.input} />
      <input placeholder="Password" type="password" style={styles.input} />

      <button style={styles.button}>
        Login
      </button>

      <p onClick={switchToRegister} style={styles.link}>
        No account? Register
      </p>
    </div>
  );
}

const styles = {
  
};