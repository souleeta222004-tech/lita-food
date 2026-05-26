export default function CartPanel({ cart, setCart, tableId, onCheckout }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-panel">
      <h3>Giỏ hàng</h3>

      <div className="cart-list">
        {cart.map((item) => (
          <CartItem key={item._id} item={item} setCart={setCart} />
        ))}
      </div>

      {/* summary */}
      <div className="order-toolbox">
        <p>🪑 Bàn: <b>{tableId}</b></p>

        <div className="order-total">
          Tổng: {total.toLocaleString()} đ
        </div>

        <button
          className="checkout-btn"
          onClick={onCheckout}
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
}