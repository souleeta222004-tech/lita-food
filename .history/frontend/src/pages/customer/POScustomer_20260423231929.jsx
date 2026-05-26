import MenuSearchBar from "../../components/admin/menu/MenuSearchBar";
import CategoryFilter from "../../components/admin/menu/CategoryFilter";
import POSGrid from "../../components/staff/POSGrid";
import CartPanel from "../../components/customer/CartPanel";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { getMenus } from "../../services/menu.service";

// ✅ dùng service mới
import {
  createCustomer,
  createCustomerOrder,
} from "../../services/customer.service";

import "../../assets/style/staff/POS.css";

export default function POScustomer() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // ================= CORE STATE =================
  const [tableId, setTableId] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  // ================= INIT CUSTOMER + TABLE =================
  useEffect(() => {
    const init = async () => {
      try {
        // 🔥 TABLE
        let tId =
          params.get("table") || localStorage.getItem("tableId");

        if (!tId) {
          return navigate("/select-table");
        }

        localStorage.setItem("tableId", tId);
        setTableId(tId);

        // 🔥 CUSTOMER
        let cId = localStorage.getItem("customerId");

        if (!cId || cId.length !== 24) {
          const res = await createCustomer();
          cId = res.data.data._id;

          localStorage.setItem("customerId", cId);
        }

        setCustomerId(cId);
      } catch (err) {
        console.error("INIT ERROR:", err);
      }
    };

    init();
  }, []);

  // ================= MENU =================
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await getMenus();

        const formatted = (res.data.data || res.data).map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          category:
            typeof item.category === "object"
              ? item.category.name
              : item.category,
          image: item.image
            ? `http://localhost:5000/uploads/${item.image}`
            : "",
        }));

        setMenus(formatted);
      } catch (err) {
        console.error("MENU ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  // ================= FILTER =================
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");

  const categories = useMemo(() => {
    const unique = [...new Set(menus.map((m) => m.category))];
    return ["Tất cả", ...unique];
  }, [menus]);

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
      return alert("Giỏ hàng trống!");
    }

    if (!tableId || !customerId) {
      return alert("Thiếu thông tin!");
    }

    try {
      const orderData = {
        table: tableId,
        customer: customerId,
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
      };

      console.log("SEND ORDER:", orderData);

      await createCustomerOrder(orderData);

      alert("Đặt hàng thành công!");

      // 🔥 QUAN TRỌNG: KHÔNG truyền table nữa
      navigate("/orders");

      setCart([]);
      setShowCart(false);
      localStorage.removeItem("cart");
    } catch (err) {
      console.error("ORDER ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "Lỗi đặt hàng!");
    }
  };

  // ================= UI =================
  if (loading) return <p>Đang tải menu...</p>;

  return (
    <div className="menu-page">
      <p className="table-label">
        🪑 Bàn: <b>{tableId}</b>
      </p>

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
        <div
          className="cart-bubble"
          onClick={() => setShowCart(!showCart)}
        >
          🛒
          <span className="cart-count">{cart.length}</span>
        </div>
      )}
    </div>
  );
}