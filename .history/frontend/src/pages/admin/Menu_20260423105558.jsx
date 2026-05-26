import { useState, useMemo, useEffect } from "react";
import MenuSearchBar from "../../components/admin/menu/MenuSearchBar";
import CategoryFilter from "../../components/admin/menu/CategoryFilter";
import MenuGrid from "../../components/admin/menu/MenuGrid";
import MenuEditorPanel from "../../components/admin/menu/MenuEditorPanel";
import "../../assets/style/admin/Menu.css";

import {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  toggleMenu,
} from "../../services/menu.service";

export default function Menu() {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [category, setCategory] = useState("Tất cả");
  const [search, setSearch] = useState("");

  const fetchMenus = async () => {
    try {
      const res = await getMenus();

      const formatted = res.data.data.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        category: item.category?.name || "Khác",
        image: item.image
          ? `http://localhost:5000/uploads/${item.image}`
          : "",
        isActive: item.isAvailable,
      }));

      setMenus(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

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

  const handleEdit = (item) => setSelectedMenu(item);

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa món này?")) return;

    try {
      await deleteMenu(id);
      fetchMenus();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleMenu(id);
      fetchMenus();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (data) => {
  try {
    const payload = {
      name: data.name,
      price: Number(data.price),
      category: data.category,
      image: data.image, // dùng URL preview tạm
    };

    if (selectedMenu) {
      await updateMenu(selectedMenu._id, payload);
    } else {
      await createMenu(payload);
    }

    fetchMenus();
    setSelectedMenu(null);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="menu-page">
      <MenuSearchBar search={search} setSearch={setSearch} />

      <CategoryFilter
        category={category}
        setCategory={setCategory}
      />

      <div className="menu-content">
        <div className="menu-left">
          <MenuGrid
            menus={filteredMenus}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </div>

        <div className="menu-right">
          <MenuEditorPanel
            selected={selectedMenu}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}