//frontend/src/pages/customer/POScustomer.jsx
import MenuSearchBar from "../../components/admin/menu/MenuSearchBar";
import CategoryFilter from "../../components/admin/menu/CategoryFilter";
import POSGrid from "../../components/staff/POSGrid";
import CartPanel from "../../components/customer/CartPanel";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import "../../assets/style/staff/POS.css";

export default function POScustomer() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const tableId = params.get("table");

  useEffect(() => {
    if (!tableId) navigate("/select-table");
  }, [tableId]);

  const [menus, setMenus] = useState([...]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

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

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  // 🔥 xử lý order tại đây
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    const order = {
      tableId,
      items: cart,
      total,
      status: "pending",
    };

    console.log("ORDER:", order);

    // TODO: call API

    alert("Đặt hàng thành công!");
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="menu-page">
      <p>🪑 Bàn: <b>{tableId}</b></p>

      <MenuSearchBar search={search} setSearch={setSearch} />
      <CategoryFilter category={category} setCategory={setCategory} />

      <div className="menu-content">
        <div className="menu-left">
          <POSGrid menus={filteredMenus} onAdd={addToCart} />
        </div>

        {/* DESKTOP */}
        <div className="menu-right">
          <CartPanel
            cart={cart}
            setCart={setCart}
            tableId={tableId}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      {/* MOBILE FLOATING */}
      {cart.length > 0 && (
        <div className="cart-floating" onClick={() => setShowCart(true)}>
          <span>{cart.length} món</span>
          <b>{total.toLocaleString()}đ</b>
        </div>
      )}

      {/* MOBILE DRAWER */}
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

            <CartPanel
              cart={cart}
              setCart={setCart}
              tableId={tableId}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      )}
    </div>
  );
}