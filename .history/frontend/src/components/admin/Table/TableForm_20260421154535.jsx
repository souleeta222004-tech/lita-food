import { useState, useEffect } from "react";

export default function TableForm({ selected, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    qrCode: "",
    status: "available",
  });

  useEffect(() => {
    if (selected) setForm(selected);
    else
      setForm({
        name: "",
        code: "",
        qrCode: "",
        status: "available",
      });
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.wrapper}>
      <h3>{selected ? "Cập nhật bàn" : "Thêm bàn"}</h3>

      <input
        name="name"
        placeholder="Tên bàn"
        value={form.name}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="code"
        placeholder="Mã QR"
        value={form.code}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="qrCode"
        placeholder="Link QR"
        value={form.qrCode}
        onChange={handleChange}
        style={styles.input}
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        style={styles.input}
      >
        <option value="available">Trống</option>
        <option value="occupied">Có khách</option>
      </select>

      <button onClick={() => onSubmit(form)} style={styles.btn}>
        {selected ? "Update" : "Done"}
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },
  btn: {
    padding: 10,
    borderRadius: 8,
    background: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};