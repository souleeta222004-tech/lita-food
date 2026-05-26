//frontend/src/pages/customer/POScustomer.jsx
import MenuSearchBar from "../../components/admin/menu/MenuSearchBar";
import CategoryFilter from "../../components/admin/menu/CategoryFilter";
import POSGrid from "../../components/staff/POSGrid";
import CartPanel from "../../components/staff/CartPanel";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import "../../assets/style/staff/POS.css";

export default function POScustomer() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const tableId = params.get("table");

  // 👉 redirect nếu chưa có bàn
  useEffect(() => {
    if (!tableId) navigate("/select-table");
  }, [tableId]);

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
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

  // filter
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

  // add cart
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

  // total
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  // 👉 đặt hàng
  const handleOrder = () => {
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
  };

  return (
    <div className="menu-page">
      
      {/* 🔥 hiển thị bàn */}
      <p style={{ marginBottom: 10 }}>
        🪑 Bàn: <b>{tableId}</b>
      </p>

      <MenuSearchBar search={search} setSearch={setSearch} />
      <CategoryFilter category={category} setCategory={setCategory} />

      <div className="menu-content">
        {/* LEFT */}
        <div className="menu-left">
          <POSGrid menus={filteredMenus} onAdd={addToCart} />
        </div>

        {/* RIGHT CART */}
        <div className="menu-right">
          <CartPanel cart={cart} setCart={setCart} />

          <div className="order-toolbox">
            <h3>Tổng: {total.toLocaleString()}đ</h3>

            <button className="checkout-btn" onClick={handleOrder}>
              Đặt hàng
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      {cart.length > 0 && (
        <div className="cart-floating" onClick={() => setShowCart(true)}>
          <span>{cart.length} món</span>
          <b>{total.toLocaleString()}đ</b>
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

            <div className="order-toolbox">
              <h3>Tổng: {total.toLocaleString()}đ</h3>

              <button className="checkout-btn" onClick={handleOrder}>
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}