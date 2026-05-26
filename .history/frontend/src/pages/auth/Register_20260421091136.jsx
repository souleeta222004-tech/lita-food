import React from 'react';
import "../../assets/styles/auth.css";    
export default function Register({ switchToLogin }) {
  return (
    <div style={styles.container}>
      <h2>Register</h2>

      <input placeholder="Name" style={styles.input} />
      <input placeholder="Email" style={styles.input} />
      <input placeholder="Password" type="password" style={styles.input} />

      <button style={styles.button}>
        Register
      </button>

      <p onClick={switchToLogin} style={styles.link}>
        Already have account? Login
      </p>
    </div>
  );
}

const styles = {
  
};