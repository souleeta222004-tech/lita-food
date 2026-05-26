import { useState } from "react";

export default function OrderToolbox({ cart, onCheckout, tables }) {
  const [table, setTable] = useState("");
  const [customer, setCustomer] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    onCheckout({
      table,
      customer,
    });
  };

  return (
    <div className="order-toolbox">
      {/* 🪑 chọn bàn */}
      <select value={table} onChange={(e) => setTable(e.target.value)}>
        <option value="">-- Chọn bàn --</option>

        {tables.map((t) => (
          <option key={t._id} value={t._id}>
            {t.name || `Bàn ${t.number}`}
          </option>
        ))}
      </select>

      {/* 👤 khách */}
      <input
        type="text"
        placeholder="Tên khách (optional)"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />

      {/* 💰 total */}
      <div className="order-total">
        Tổng: {total.toLocaleString()} đ
      </div>

      {/* 🔥 button */}
      <button className="checkout-btn" onClick={handleSubmit}>
        Thanh toán
      </button>
    </div>
  );
}