//frontend/src/pages/admin/Menu.jsx
import { useState, useMemo } from "react";
import MenuSearchBar from "../../components/admin/menu/MenuSearchBar";
import CategoryFilter from "../../components/admin/menu/CategoryFilter";
import MenuGrid from "../../components/admin/menu/MenuGrid";
import MenuEditorPanel from "../../components/admin/menu/MenuEditorPanel";

export default function Menu() {
  // 🔥 Fake data (sau thay bằng API)
  const [menus, setMenus] = useState([
    {
      _id: "1",
      name: "Trà sữa trân châu",
      price: 30000,
      category: "Trà sữa",
      image:
        "https://images.unsplash.com/photo-1558857563-c0c6ee9f3d3a",
    },
    {
      _id: "2",
      name: "Cafe sữa đá",
      price: 25000,
      category: "Cafe",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
    {
      _id: "3",
      name: "Gà rán giòn",
      price: 50000,
      category: "Gà rán",
      image:
        "https://images.unsplash.com/photo-1562967916-eb82221dfb36",
    },
  ]);

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [category, setCategory] = useState("Tất cả");
  const [search, setSearch] = useState("");

  // 🔍 Filter + search
  const filteredMenus = useMemo(() => {
    return menus.filter((item) => {
      const matchCategory =
        category === "Tất cả" || item.category === category;

      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [menus, category, search]);

  // ✏️ Edit
  const handleEdit = (item) => {
    setSelectedMenu(item);
  };

  // 🗑 delete
const handleDelete = (id) => {
  setMenus((prev) => prev.filter((item) => item._id !== id));
};

// 👁 toggle active
const handleToggle = (id) => {
  setMenus((prev) =>
    prev.map((item) =>
      item._id === id
        ? { ...item, isActive: !item.isActive }
        : item
    )
  );
};

  // ➕ Add / Update
  const handleSubmit = (data) => {
    if (selectedMenu) {
      // update
      setMenus((prev) =>
        prev.map((item) =>
          item._id === selectedMenu._id ? { ...item, ...data } : item
        )
      );
    } else {
      // add
      const newItem = {
        ...data,
        _id: Date.now().toString(),
        price: Number(data.price),
      };
      setMenus((prev) => [newItem, ...prev]);
    }

    // reset form
    setSelectedMenu(null);
  };

  return (
    <div style={styles.page}>
      {/* 🔍 Search */}
      <MenuSearchBar search={search} setSearch={setSearch} />

      {/* 🧭 Category */}
      <CategoryFilter
        category={category}
        setCategory={setCategory}
      />

      {/* 📦 Main content */}
      <div style={styles.content}>
        {/* LEFT: grid */}
        <div style={styles.left}>
          <MenuGrid menus={filteredMenus} onEdit={handleEdit} />
        </div>
        

        {/* RIGHT: form */}
        <MenuEditorPanel
          selected={selectedMenu}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: 20,
    background: "#f9f9f9",
    minHeight: "100vh",
  },
  content: {
    display: "flex",
    gap: 20,
  },
  left: {
    width: "70%",
  },
};