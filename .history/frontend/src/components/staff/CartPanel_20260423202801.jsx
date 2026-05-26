import CartItem from "./CartItem";
import OrderToolbox from "./OrderToolbox";
import { createOrder } from "../../services/order.service";

export default function CartPanel({ cart, setCart, tables }) {

  const handleCheckout = async (extraData) => {
  try {
    if (cart.length === 0) {
      return alert("Giỏ hàng trống!");
    }

    if (!extraData.table) {
      return alert("Vui lòng chọn bàn!");
    }

    const orderData = {
      table: extraData.table,
      items: cart.map((i) => ({
        product: i._id,
        quantity: i.quantity,
      })),
      note: "",
    };

    console.log("ORDER:", orderData);

    await createOrder(orderData);

    alert("Thanh toán thành công!");
    setCart([]);
  } catch (err) {
    console.error("ERROR:", err.response?.data || err);
    alert(err.response?.data?.message || "Thanh toán thất bại!");
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