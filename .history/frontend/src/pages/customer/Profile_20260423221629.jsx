import { useState, useEffect } from "react";
import "../../assets/style/customer/profile.css";

import { getProfileApi, updateProfileApi } from "../../services/auth.service";
import { getCustomerOrders } from "../../services/order.service";

export default function CustomerProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [orders, setOrders] = useState([]);

  // ================= LOAD PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileApi();

        setForm((prev) => ({
          ...prev,
          name: res.data.data.name,
          email: res.data.data.email,
        }));
      } catch (err) {
        console.error("Lỗi load profile:", err);
      }
    };

    fetchProfile();
  }, []);

  // ================= LOAD ORDERS =================
  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await getCustomerOrders();
      setOrders(res.data.data);
    } catch (err) {
      console.error("Lỗi load orders:", err);
    }
  };

  fetchOrders();
}, []);

  // ================= HANDLE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await updateProfileApi(form);

      alert("Cập nhật thành công!");
      setForm({ ...form, password: "" });
    } catch (err) {
      console.error(err);
      alert("Lỗi cập nhật!");
    }
  };

  // ================= UI =================
  return (
    <div className="profile-page">

      {/* ===== PROFILE ===== */}
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
        <h3>Lịch sử đơn hàng</h3>

        <div className="order-list">
          {orders.map((o) => (
            <div className="order-item" key={o._id}>
              <div>
                <p className="order-id">{o._id.slice(-6)}</p>
                <span className="order-date">
                  {new Date(o.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="order-right">
                <p className="order-total">
                  {o.totalAmount.toLocaleString()}đ
                </p>

                <span className={`status ${o.paymentStatus === "paid" ? "done" : "pending"}`}>
                  {o.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}