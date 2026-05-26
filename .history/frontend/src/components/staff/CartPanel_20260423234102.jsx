import CartItem from "./CartItem";
import OrderToolbox from "./OrderToolbox";

export default function CartPanel({ cart, setCart, tables }) {

  const handleCheckout = (orderData) => {
    console.log("ORDER:", orderData);

    // 👉 sau này call API ở đây
    // await createOrder(orderData)

    alert("Thanh toán thành công!");

    // clear cart
    setCart([]);
  };

  return (
    <div className="cart-panel">
      <h3>Giỏ hàng</h3>

      <div className="cart-list">
        {cart.map((item) => (
          <CartItem key={item._id} item={item} setCart={setCart} />
        ))}
      </div>

      {/* 👇 toolbox */}
      <OrderToolbox cart={cart} onCheckout={handleCheckout} />
    </div>
  );
}