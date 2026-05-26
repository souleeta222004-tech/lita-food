import CartItem from "./CartItem";

export default function CartPanel({ cart, setCart }) {
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

      <div className="cart-footer">
        <h4>Tổng: {total.toLocaleString()} đ</h4>
        <button className="checkout-btn">Thanh toán</button>
      </div>
    </div>
  );
}