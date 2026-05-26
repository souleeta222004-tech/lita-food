//frontend/src/components/admin/StaffForm.jsx
import { useState, useEffect } from "react";

export default function StaffForm({ selected, onSubmit }) {
  const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  role: "staff",
});

  useEffect(() => {
    if (selected) {
  setForm({
    name: selected.name || "",
    email: selected.email || "",
    password: "",
    role: selected.role || "staff",
  });
} else {
  setForm({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });
}
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="form">
      <input
        name="name"
        placeholder="Tên"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        placeholder="Mật khẩu"
        type="password"
        value={form.password}
        onChange={handleChange}
      />

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
      </select>

      <button onClick={() => onSubmit(form)}>
        {selected ? "Update" : "Add"}
      </button>
    </div>
  );
}