//frontend/src/pages/admin/POS.jsx
import MenuSearchBar from "../../components/admin/menu/MenuSearchBar";
import CategoryFilter from "../../components/admin/menu/CategoryFilter";
import POSGrid from "../../components/staff/POSGrid";
import CartPanel from "../../components/staff/CartPanel";
import { getMenus } from "../../services/menu.service";
import { useState, useMemo , useEffect} from "react";
import "../../assets/style/staff/POS.css";


export default function POS() {
  const [menus, setMenus] = useState([]);
  useEffect(() => {
  const fetchMenus = async () => {
    try {
      const res = await getMenus();

      // tùy BE trả về dạng nào
      setMenus(res.data.data || res.data);
    } catch (err) {
      console.error("Lỗi load menu:", err);
    }
  };

  fetchMenus();
}, []);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [showCart, setShowCart] = useState(false);

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
      {/* 📱 MOBILE CART BUTTON */}
        {cart.length > 0 && (
        <div className="cart-floating" onClick={() => setShowCart(true)}>
            <span>{cart.length} món</span>
            <b>
            {cart
                .reduce((s, i) => s + i.price * i.quantity, 0)
                .toLocaleString()}đ
            </b>
        </div>
        )}
        {showCart && (
  <div className="cart-overlay" onClick={() => setShowCart(false)}>
    <div
      className="cart-drawer"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="cart-header">
        <h3>Giỏ hàng</h3>
        <button onClick={() => setShowCart(false)}>✕</button>
      </div>

      <CartPanel cart={cart} setCart={setCart} />
    </div>
  </div>
)}
    </div>
    
    
  );
}