//frontend/src/pages/auth/Login.jsx
import React from "react";
import "../../assets/style/auth/auth.css";

import facebookIcon from "../../assets/img/facebook.png";
import googleIcon from "../../assets/img/google.png";

import { registerApi } from "../../services/auth.service";

export default function Register({ switchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      await registerApi(form);
      alert("Register success!");
      switchToLogin();
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Register</h2>

      <input
        className="auth-input"
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        className="auth-input"
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        className="auth-input"
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="auth-button" onClick={handleRegister}>
        Register
      </button>

      <p className="auth-link" onClick={switchToLogin}>
        Already have account? Login
      </p>
    </div>
  );
}