import { useState } from "react";
import "../../assets/style/customer/profile.css";

export default function CustomerProfile() {
  const [form, setForm] = useState({
    name: "Khách LITA",
    email: "customer@gmail.com",
    password: "",
  });

  // 👉 mock lịch sử
  const [orders] = useState([
    {
      id: "ORD001",
      total: 90000,
      status: "Đã thanh toán",
      date: "22/04/2026",
    },
    {
      id: "ORD002",
      total: 55000,
      status: "Đang xử lý",
      date: "21/04/2026",
    },
  ]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("UPDATE PROFILE:", form);
    alert("Cập nhật thành công!");
  };

  return (
    <div className="profile-page">

      {/* ===== PROFILE CARD ===== */}
      <div className="profile-card">

        <div className="avatar-box">
          <div className="avatar-large"></div>
          <p className="role">Khách hàng</p>
        </div>

        <div className="profile-form">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tên"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Mật khẩu mới (optional)"
          />

          <button onClick={handleSubmit}>
            Cập nhật
          </button>
        </div>
      </div>

      {/* ===== ORDER HISTORY ===== */}
      <div className="order-history">

        <h3>Lịch sử thanh toán</h3>

        <div className="order-list">
          {orders.map((o) => (
            <div className="order-item" key={o.id}>
              <div>
                <p className="order-id">{o.id}</p>
                <span className="order-date">{o.date}</span>
              </div>

              <div className="order-right">
                <p className="order-total">
                  {o.total.toLocaleString()}đ
                </p>
                <span className={`status ${o.status === "Đã thanh toán" ? "done" : "pending"}`}>
                  {o.status}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}