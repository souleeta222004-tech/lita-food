import { useState, useMemo } from "react";
import "../../assets/style/admin/payment.css";

export default function PaymentPage() {
  const [payments] = useState([
    {
      _id: "1",
      order: { table: { name: "Bàn 1" } },
      method: "cash",
      amount: 120000,
      status: "success",
      createdAt: new Date(),
    },
    {
      _id: "2",
      order: { table: { name: "Bàn 2" } },
      method: "banking",
      amount: 80000,
      status: "pending",
      createdAt: new Date(),
    },
  ]);

  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return payments;
    return payments.filter((p) => p.status === filter);
  }, [payments, filter]);

  return (
    <div className="payment-page">
      <h2>Thanh toán</h2>

      {/* filter */}
      <div className="payment-filter">
        {["all", "success", "pending", "failed"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* table */}
      <div className="payment-table">
        <table>
          <thead>
            <tr>
              <th>Bàn</th>
              <th>Số tiền</th>
              <th>Phương thức</th>
              <th>Trạng thái</th>
              <th>Thời gian</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p._id}>
                <td>{p.order?.table?.name}</td>
                <td>{p.amount.toLocaleString()}đ</td>
                <td>{p.method}</td>

                <td>
                  <span className={`status ${p.status}`}>
                    {p.status}
                  </span>
                </td>

                <td>
                  {new Date(p.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}