//frontend/src/pages/admin/POS.jsx
import MenuSearchBar from "../../components/admin/menu/MenuSearchBar";
import CategoryFilter from "../../components/admin/menu/CategoryFilter";
import POSGrid from "../../components/staff/POSGrid";
import CartPanel from "../../components/staff/CartPanel";


export default function POS() {
  const [menus, setMenus] = useState([
    {
      _id: "1",
      name: "Trà sữa",
      price: 30000,
      category: "Trà sữa",
      image: "https://images.unsplash.com/photo-1558857563-c0c6ee9f3d3a",
    },
  ]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");

  const [cart, setCart] = useState([]);

  // filter giống admin
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

  // 🛒 ADD TO CART
  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((p) => p._id === item._id);
      if (exist) {
        return prev.map((p) =>
          p._id === item._id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  return (
    <div className="menu-page">
      <MenuSearchBar search={search} setSearch={setSearch} />
      <CategoryFilter category={category} setCategory={setCategory} />

      <div className="menu-content">
        {/* LEFT */}
        <div className="menu-left">
          <POSGrid menus={filteredMenus} onAdd={addToCart} />
        </div>

        {/* RIGHT */}
        <div className="menu-right">
          <CartPanel cart={cart} setCart={setCart} />
        </div>
      </div>
    </div>
  );
}