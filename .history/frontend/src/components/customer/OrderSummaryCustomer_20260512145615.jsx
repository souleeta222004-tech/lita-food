import { useState } from "react";

export default function OrderSummaryCustomer({
  cart,
  tableId,
  note,
  setNote,
  onCheckout,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 👇 thêm
  const [paymentMethod, setPaymentMethod] = useState("cash");

  return (
    <div className="order-toolbox">
      <p>
        🪑 Bàn: <b>{tableId}</b>
      </p>

      <textarea
        placeholder="Ghi chú (ít đá, không cay...)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      {/* PAYMENT */}
      <div className="payment-box">
        <h4>Phương thức thanh toán</h4>

        <label>
          <input
            type="radio"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Thanh toán tại quầy
        </label>

        <label>
          <input
            type="radio"
            value="banking"
            checked={paymentMethod === "banking"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Thanh toán online
        </label>
      </div>

      {/* ONLINE METHODS */}
      {paymentMethod === "banking" && (
        <div className="banking-methods">
          <button>MoMo</button>
          <button>VNPay</button>
          <button>PayPal</button>
        </div>
      )}

      <div className="order-total">
        Tổng: {total.toLocaleString()} đ
      </div>

      <button
        className="checkout-btn"
        onClick={() =>
          onCheckout({
            paymentMethod,
          })
        }
      >
        Đặt hàng
      </button>
    </div>
  );
}