import CartItem from "./CartItem";
import OrderToolbox from "./OrderToolbox";
import { createOrder } from "../../services/order.service";
import { createPayment } from "../../services/payment.service";
import api from "../../services/api";

export default function CartPanel({ cart, setCart, tables }) {

  const handleCheckout = async () => {
  try {
    if (!table) {
      alert("Chọn bàn trước!");
      return;
    }

    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    setLoading(true);

    const payload = {
      table,
      customer,
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

    // 1. create order
    const orderRes = await createOrder(payload);
    const order = orderRes.data.data;

    // 2. create payment
    await createPayment({
      order: order._id,
      amount: payload.total,
      method: "cash",
    });

    // 3. update table
    await api.patch(`/tables/${table}/status`, {
      status: "occupied",
    });

    alert("Thanh toán thành công!");

    // reset
    setCart([]);
    setTable("");
    setCustomer("");

  } catch (err) {
    console.error(err);
    alert("Thanh toán thất bại!");
  } finally {
    setLoading(false);
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