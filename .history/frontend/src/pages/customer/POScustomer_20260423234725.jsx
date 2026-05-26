// frontend/src/pages/customer/POScustomer.jsx
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

  // ✅ FIX TABLE (không bị đá ra ngoài)
  useEffect(() => {
    if (tableId) {
      localStorage.setItem("tableId", tableId);
    } else {
      const savedTable = localStorage.getItem("tableId");
      if (savedTable) {
        navigate(`/menu?table=${savedTable}`);
      } else {
        navigate("/select-table");
      }
    }
  }, [tableId]);

  // 👉 MENU MOCK
  const [menus] = useState([
    {
      _id: "1",
      name: "Trà sữa",
      price: 30000,
      category: "Trà sữa",
      image: "https://images.unsplash.com/photo-1558857563-c0c6ee9f3d3a",
    },
    {
      _id: "2",
      name: "Cafe",
      price: 25000,
      category: "Cafe",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    }
  ]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [showCart, setShowCart] = useState(false);

  // ✅ FIX CART (persist)
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  // checkout
  const handleCheckout = async (orderData) => {
    try {
      if (!orderData.table) {
        alert("Chọn bàn trước!");
        return;
      }

      if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
      }

      // 🔥 1. TẠO ORDER
      const orderPayload = {
        table: orderData.table,
        customer: orderData.customer,
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        total: cart.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        ),
      };

      const orderRes = await createOrder(orderPayload);
      const orderId = orderRes.data.data._id;

      console.log("ORDER CREATED:", orderRes.data);

      // 🔥 2. TẠO PAYMENT
      await createPayment({
        order: orderId,
        amount: orderPayload.total,
        method: "cash",
      });

      // 🔥 3. UPDATE TABLE STATUS
      await api.patch(`/tables/${orderData.table}/status`, {
        status: "occupied",
      });

      alert("Thanh toán thành công!");

      // clear cart
      setCart([]);

    } catch (err) {
      console.error("Checkout error:", err);
      alert("Thanh toán thất bại!");
    }
  };

  return (
    <div className="menu-page">
      <p className="table-label">🪑 Bàn: <b>{tableId}</b></p>

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




      {/* 📦 MINI CART */}
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
      {/* 🔵 BUBBLE CART */}
{cart.length > 0 && (
  <div className="cart-bubble" onClick={() => setShowCart(!showCart)}>
    🛒
    <span className="cart-count">{cart.length}</span>
  </div>
)}
    </div>
  );
}