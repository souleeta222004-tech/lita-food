//frontend/src/components/customer/OrderSummaryCustomer.jsx
export default function OrderSummaryCustomer({ cart, tableId, onCheckout }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="order-toolbox">
      <p>🪑 Bàn: <b>{tableId}</b></p>

      <div className="order-total">
        Tổng: {total.toLocaleString()} đ
      </div>

      <button
        className="checkout-btn"
        onClick={onCheckout} // ✅ gọi thẳng
      >
        Đặt hàng
      </button>
    </div>
  );
}