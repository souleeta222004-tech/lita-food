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