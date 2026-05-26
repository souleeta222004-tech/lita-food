import { useState, useMemo } from "react";
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
  // ✅ mock data chuẩn
  useEffect(() => {
  fetchMenus();
}, []);

const fetchMenus = async () => {
  try {
    const res = await getMenus();

    const formatted = res.data.data.map((item) => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      category: item.category?.name || "Khác",
      image: item.image,
      isActive: item.isAvailable,
    }));

    setMenus(formatted);
  } catch (error) {
    console.error(error);
  }
};

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [category, setCategory] = useState("Tất cả");
  const [search, setSearch] = useState("");

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

  const handleDelete = (id) => {
    setMenus((prev) => prev.filter((item) => item._id !== id));
  };

  const handleToggle = (id) => {
    setMenus((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, isActive: !item.isActive }
          : item
      )
    );
  };

  const handleSubmit = (data) => {
    if (selectedMenu) {
      setMenus((prev) =>
        prev.map((item) =>
          item._id === selectedMenu._id ? { ...item, ...data } : item
        )
      );
    } else {
      const newItem = {
        ...data,
        _id: Date.now().toString(),
        price: Number(data.price),
        isActive: true,
      };
      setMenus((prev) => [newItem, ...prev]);
    }
    setSelectedMenu(null);
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