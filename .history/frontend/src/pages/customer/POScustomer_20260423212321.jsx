import MenuSearchBar from "../../components/admin/menu/MenuSearchBar";
import CategoryFilter from "../../components/admin/menu/CategoryFilter";
import POSGrid from "../../components/staff/POSGrid";
import CartPanel from "../../components/customer/CartPanel";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { getMenus } from "../../services/menu.service";
import { createOrder } from "../../services/order.service";

import "../../assets/style/staff/POS.css";

export default function POScustomer() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const tableId = params.get("table");

  // ================= TABLE =================
  useEffect(() => {
    if (tableId) {
      localStorage.setItem("tableId", tableId);
    } else {
      const saved = localStorage.getItem("tableId");
      if (saved) navigate(`/menu?table=${saved}`);
      else navigate("/select-table");
    }
  }, [tableId]);

  // ================= MENU =================
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  //frontend/src/admin/CategoryFilter.jsx
export default function CategoryFilter({
  category,
  setCategory,
  categories = [],
}) {
  return (
    <div className="menu-category">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={category === cat ? "active" : ""}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await getMenus();
        setMenus(res.data.data); // ⚠️ chuẩn backend bạn
      } catch (err) {
        console.error("Lỗi menu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  // ================= FILTER =================
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");

  const categories = [
    "Tất cả",
    ...new Set(menus.map((m) => m.category)),
  ];

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

  // ================= CART =================
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

  // ================= CHECKOUT =================
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    try {
      const orderData = {
        table: tableId, // ⚠️ đúng field BE
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
      };

      await createOrder(orderData);

      alert("Đặt hàng thành công!");

      setCart([]);
      setShowCart(false);
      localStorage.removeItem("cart");

    } catch (err) {
      console.error(err);
      alert("Lỗi đặt hàng!");
    }
  };

  // ================= UI =================
  if (loading) return <p>Đang tải menu...</p>;

  return (
    <div className="menu-page">
      <p className="table-label">🪑 Bàn: <b>{tableId}</b></p>

      <MenuSearchBar search={search} setSearch={setSearch} />

      <CategoryFilter
        categories={categories}
        category={category}
        setCategory={setCategory}
      />

      <div className="menu-content">
        <div className="menu-left">
          <POSGrid menus={filteredMenus} onAdd={addToCart} />
        </div>

        <div className="menu-right">
          <CartPanel
            cart={cart}
            setCart={setCart}
            tableId={tableId}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      {/* MOBILE CART */}
      {showCart && (
        <div className="cart-mini">
          <div className="cart-mini-header">
            <span>Giỏ hàng</span>
            <button onClick={() => setShowCart(false)}>–</button>
          </div>

          <CartPanel
            cart={cart}
            setCart={setCart}
            tableId={tableId}
            onCheckout={handleCheckout}
          />
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-bubble" onClick={() => setShowCart(!showCart)}>
          🛒
          <span className="cart-count">{cart.length}</span>
        </div>
      )}
    </div>
  );
}