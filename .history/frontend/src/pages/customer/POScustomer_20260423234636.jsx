import CartItem from "./CartItem";
import OrderToolbox from "./OrderToolbox";
import { createOrder } from "../../services/order.service";
import { createPayment } from "../../services/payment.service";
import api from "../../services/api";

export default function CartPanel({ cart, setCart, tables }) {

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