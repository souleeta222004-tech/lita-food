import MenuSearchBar from "../../components/admin/menu/MenuSearchBar";
import CategoryFilter from "../../components/admin/menu/CategoryFilter";
import POSGrid from "../../components/staff/POSGrid";
import CartPanel from "../../components/customer/CartPanel";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import "../../assets/style/staff/POS.css";
import { createQrOrder } from "../../services/order.service";
import { getMenus } from "../../services/menu.service";

export default function POScustomer() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const tableId = params.get("table");

  

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // ================= TABLE CHECK =================
  useEffect(() => {
    if (tableId) {
      localStorage.setItem("tableId", tableId);
    } else {
      const saved = localStorage.getItem("tableId");
      if (saved) navigate(`/menu?table=${saved}`);
      else navigate("/select-table");
    }
  }, [tableId]);

  // ================= CART PERSIST =================
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ================= FILTER =================
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

  // ================= ADD CART =================
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

  // ================= CHECKOUT (🔥 MAIN FIX) =================
  const handleCheckout = async () => {
    if (!cart.length) {
      alert("Giỏ hàng trống!");
      return;
    }

    try {
      const payload = {
        table,
        items: cart.map((i) => ({
          product: i._id,
          quantity: i.quantity,
        })),
        note: "",
      };

      const res = await createQrOrder(payload);

      console.log("ORDER SUCCESS:", res.data);

      alert("Đặt hàng thành công!");

      setCart([]);
      setShowCart(false);
      localStorage.removeItem("cart");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Đặt hàng thất bại");
    }
  };

  return (
    <div className="menu-page">
      <p className="table-label">
        🪑 Bàn: <b>{tableId}</b>
      </p>

      <MenuSearchBar search={search} setSearch={setSearch} />
      <CategoryFilter category={category} setCategory={setCategory} />

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

      {showCart && (
        <div className="cart-mini">
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
          🛒 <span>{cart.length}</span>
        </div>
      )}
    </div>
  );
}