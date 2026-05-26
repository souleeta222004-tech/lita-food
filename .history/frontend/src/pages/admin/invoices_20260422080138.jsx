import { useState } from "react";
import "../../assets/style/admin/.css";

export default function invoicesPage() {
  const [bills] = useState([
    {
      _id: "1",
      table: { name: "Bàn 1" },
      items: [
        { name: "Trà sữa", price: 30000, quantity: 2 },
        { name: "Gà rán", price: 50000, quantity: 1 },
      ],
      totalAmount: 110000,
      paymentStatus: "paid",
      createdAt: new Date(),
    },
  ]);

  const [selected, setSelected] = useState(null);

  return (
    <div className="bill-page">
      <h2>Hóa đơn</h2>

      <div className="bill-content">
        {/* LEFT */}
        <div className="bill-list">
          {bills.map((b) => (
            <div
              key={b._id}
              className="bill-card"
              onClick={() => setSelected(b)}
            >
              <h4>{b.table?.name}</h4>
              <p>{b.totalAmount.toLocaleString()}đ</p>
              <span>{b.paymentStatus}</span>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="bill-detail">
          {!selected ? (
            <p>Chọn hóa đơn</p>
          ) : (
            <>
              <h3>{selected.table?.name}</h3>

              {selected.items.map((i, idx) => (
                <div key={idx} className="bill-item">
                  <span>{i.name}</span>
                  <span>x{i.quantity}</span>
                  <span>
                    {(i.price * i.quantity).toLocaleString()}đ
                  </span>
                </div>
              ))}

              <h4>
                Tổng: {selected.totalAmount.toLocaleString()}đ
              </h4>

              <p>
                Thanh toán:{" "}
                <b>{selected.paymentStatus}</b>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}