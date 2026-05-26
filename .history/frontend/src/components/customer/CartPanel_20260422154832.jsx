//frontend/src/components/customer/CartPanel.jsx
import OrderSummaryCustomer from "./OrderSummaryCustomer";
import car
export default function CartPanel({ cart, setCart, tableId }) {

  const handleCheckout = ({ cart, total, tableId }) => {
    const order = {
      tableId,
      items: cart,
      total,
      status: "pending",
    };

    console.log("ORDER:", order);

    alert("Đặt hàng thành công!");
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

      {/* 👇 dùng component mới */}
      <OrderSummaryCustomer
        cart={cart}
        tableId={tableId}
        onCheckout={handleCheckout}
      />
    </div>
  );
}