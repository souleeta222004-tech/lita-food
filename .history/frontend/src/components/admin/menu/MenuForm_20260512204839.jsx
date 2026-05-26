// frontend/src/components/admin/menu/MenuForm.jsx
import { useState, useEffect } from "react";

export default function MenuForm({
  selected,
  onSubmit,
  categories,
}) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    file: null,
  });

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name || "",
        price: selected.price || "",
        category: selected.category || "",
        image: selected.image || "",
        file: null,
      });
    } else {
      setForm({
        name: "",
        price: "",
        category: "",
        image: "",
        file: null,
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm({
      ...form,
      image: URL.createObjectURL(file),
      file,
    });
  };

  return (
    <div className="menu-form">
      <h3>
        {selected ? "Cập nhật món" : "Thêm món"}
      </h3>

      {form.image && (
        <img
          src={form.image}
          alt="preview"
          className="menu-preview"
        />
      )}

      <input
        type="file"
        onChange={handleImageChange}
      />

      <input
        name="name"
        placeholder="Tên món"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="price"
        type="number"
        placeholder="Giá"
        value={form.price}
        onChange={handleChange}
      />

      {/* CATEGORY */}
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
      >
        <option value="">
          -- Chọn danh mục --
        </option>

        {categories.map((cat) => (
          <option
            key={cat._id}
            value={cat._id}
          >
            {cat.name}
          </option>
        ))}
      </select>

      <button onClick={() => onSubmit(form)}>
        {selected ? "Update" : "Create"}
      </button>
    </div>
  );
}