import { useState, useEffect } from "react";

export default function MenuForm({ selected, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (selected) {
      setForm(selected);
    } else {
      setForm({
        name: "",
        price: "",
        category: "",
        image: "",
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 upload file → preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setForm({ ...form, image: preview, file }); // giữ cả file để upload sau
    }
  };

  return (
    <div style={styles.wrapper}>
      <h3>{selected ? "Cập nhật món" : "Thêm món"}</h3>

      {/* 🖼 Preview */}
      {form.image && (
        <img src={form.image} alt="" style={styles.preview} />
      )}

      <input type="file" onChange={handleImageChange} />

      <input
        name="name"
        placeholder="Tên món"
        value={form.name}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="price"
        placeholder="Giá"
        value={form.price}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="category"
        placeholder="Danh mục"
        value={form.category}
        onChange={handleChange}
        style={styles.input}
      />

      <button style={styles.btn} onClick={() => onSubmit(form)}>
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
    border: "none",
    background: "#000",
    color: "#fff",
    cursor: "pointer",
    marginTop: 10,
  },
  preview: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    borderRadius: 10,
  },
};