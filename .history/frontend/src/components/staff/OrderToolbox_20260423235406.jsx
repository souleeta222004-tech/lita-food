import { useState } from "react";

export default function OrderToolbox({ cart, onCheckout }) {
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

    const orderData = {
      table: table || null,
      customer,
      items: cart,
      total,
    };

    onCheckout(orderData);
  };

  return (
    <div className="order-toolbox">
      {/* chọn bàn */}
      <select value={table} onChange={(e) => setTable(e.target.value)}>
        <option value="">-- Chọn bàn (optional) --</option>
        <option value="1">Bàn 1</option>
        <option value="2">Bàn 2</option>
        <option value="3">Bàn 3</option>
      </select>

      {/* khách */}
      <input
        type="text"
        placeholder="Tên khách (optional)"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />

      {/* total */}
      <div className="order-total">
        Tổng: {total.toLocaleString()} đ
      </div>

      {/* button */}
      <button className="checkout-btn" onClick={handleSubmit}>
        Thanh toán
      </button>
    </div>
  );
}