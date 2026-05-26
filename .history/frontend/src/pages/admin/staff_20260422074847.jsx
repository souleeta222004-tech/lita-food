import { useState, useMemo } from "react";

export default function StaffPage() {
  const [staffs, setStaffs] = useState([
    {
      _id: "1",
      name: "Admin",
      email: "admin@gmail.com",
      role: "admin",
      isActive: true,
    },
    {
      _id: "2",
      name: "Nhân viên A",
      email: "staff@gmail.com",
      role: "staff",
      isActive: true,
    },
  ]);

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return staffs.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [staffs, search]);

  // ➕ / ✏️
  const handleSubmit = (data) => {
    if (selected) {
      setStaffs((prev) =>
        prev.map((s) =>
          s._id === selected._id ? { ...s, ...data } : s
        )
      );
    } else {
      setStaffs((prev) => [
        { ...data, _id: Date.now().toString() },
        ...prev,
      ]);
    }

    setSelected(null);
  };

  // 🔒 toggle active
  const handleToggle = (id) => {
    setStaffs((prev) =>
      prev.map((s) =>
        s._id === id ? { ...s, isActive: !s.isActive } : s
      )
    );
  };

  return (
    <div style={styles.page}>
      <h2>Nhân viên</h2>

      <input
        placeholder="Tìm nhân viên..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.content}>
        {/* 🟩 TABLE */}
        <div style={styles.left}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.role}</td>

                  <td>
                    <span
                      style={{
                        ...styles.badge,
                        background: s.isActive
                          ? "#dcfce7"
                          : "#fee2e2",
                        color: s.isActive
                          ? "#166534"
                          : "#991b1b",
                      }}
                    >
                      {s.isActive ? "Hoạt động" : "Khóa"}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => setSelected(s)}
                      style={styles.btnEdit}
                    >
                      Sửa
                    </button>

                    <button
                      onClick={() => handleToggle(s._id)}
                      style={styles.btnToggle}
                    >
                      {s.isActive ? "Khóa" : "Mở"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🟪 FORM */}
        <div style={styles.right}>
          <h3>{selected ? "Cập nhật" : "Thêm nhân viên"}</h3>

          <StaffForm selected={selected} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
const styles = {
  page: {
    padding: 20,
    background: "#f9fafb",
  },

  search: {
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ddd",
    marginBottom: 15,
    width: "100%",
  },

  content: {
    display: "flex",
    gap: 20,
  },

  left: {
    width: "70%",
    background: "#fff",
    padding: 10,
    borderRadius: 12,
  },

  right: {
    width: "30%",
    background: "#fff",
    padding: 15,
    borderRadius: 12,
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  badge: {
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
  },

  btnEdit: {
    marginRight: 5,
    background: "#fce7f3", // hồng pastel
    border: "none",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
  },

  btnToggle: {
    background: "#e0f2fe", // xanh pastel
    border: "none",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  submit: {
    padding: 10,
    background: "#000",
    color: "#fff",
    borderRadius: 8,
    border: "none",
  },
};
function StaffForm({ selected, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "staff",
  });

  useState(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.form}>
      <input
        name="name"
        placeholder="Tên"
        value={form.name}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={styles.input}
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        style={styles.input}
      >
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
      </select>

      <button onClick={() => onSubmit(form)} style={styles.submit}>
        {selected ? "Update" : "Add"}
      </button>
    </div>
  );
}