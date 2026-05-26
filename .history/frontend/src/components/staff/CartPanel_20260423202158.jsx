import CartItem from "./CartItem";
import OrderToolbox from "./OrderToolbox";
import { createOrder } from "../../services/order.service";

export default function CartPanel({ cart, setCart, tables }) {

  const handleCheckout = async (extraData) => {
    try {
      if (cart.length === 0) {
        return alert("Giỏ hàng trống!");
      }

      const orderData = {
        table: extraData.table || null,
        customer: extraData.customer || "",
        items: cart.map((i) => ({
          product: i._id,
          quantity: i.quantity,
        })),
        total: cart.reduce((s, i) => s + i.price * i.quantity, 0),
      };

      await createOrder(orderData);

      alert("Thanh toán thành công!");
      setCart([]);
    } catch (err) {
      console.error(err);
      alert("Thanh toán thất bại!");
    }
  };

  return (
    <div className="cart-panel">
      <h3>Giỏ hàng</h3>

      <div className="cart-list">
        {cart.map((item) => (
          <CartItem key={item._id} item={item} setCart={setCart} />
        ))}
      </div>

      <OrderToolbox
        cart={cart}
        onCheckout={handleCheckout}
        tables={tables}
      />
    </div>
  );
}