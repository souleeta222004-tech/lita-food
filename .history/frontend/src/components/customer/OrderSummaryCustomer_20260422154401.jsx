export default function OrderSummaryCustomer({ cart, tableId, onCheckout }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="order-toolbox">
      {/* 🪑 bàn */}
      <p>
        🪑 Bàn: <b>{tableId}</b>
      </p>

      {/* 💰 total */}
      <div className="order-total">
        Tổng: {total.toLocaleString()} đ
      </div>

      {/* button */}
      <button
        className="checkout-btn"
        onClick={() => onCheckout({ cart, total, tableId })}
      >
        Đặt hàng
      </button>
    </div>
  );
}