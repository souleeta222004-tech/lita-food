import { useState, useEffect } from "react";
import "../../assets/style/customer/profile.css";

import {
  getCustomerProfile,
  updateCustomerProfile
} from "../../services/auth.service";

import { getCustomerOrders } from "../../services/order.service";

export default function CustomerProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [orders, setOrders] = useState([]);
  const [customerId, setCustomerId] = useState(null);

  // ================= INIT CUSTOMER =================
  useEffect(() => {
    let id = localStorage.getItem("customerId");

    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("customerId", id);
    }

    setCustomerId(id);
  }, []);

  // ================= LOAD PROFILE =================
  useEffect(() => {
    if (!customerId) return;

    const fetchProfile = async () => {
      try {
        const res = await getCustomerProfile(customerId);

        setForm({
          name: res.data.data.name || "",
          email: res.data.data.email || "",
          password: "",
        });
      } catch (err) {
        console.error("Lỗi load profile:", err);
      }
    };

    fetchProfile();
  }, [customerId]);

  // ================= LOAD ORDERS =================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getCustomerOrders();
        setOrders(res.data.data || []);
      } catch (err) {
        console.error("Lỗi load orders:", err);
      }
    };

    fetchOrders();
  }, []);

  // ================= HANDLE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await updateCustomerProfile(customerId, form);

      alert("Cập nhật thành công!");
      setForm({ ...form, password: "" });
    } catch (err) {
      console.error(err);
      alert("Lỗi cập nhật!");
    }
  };

  return (
    <div className="profile-page">

      {/* PROFILE */}
      <div className="profile-card">
        <div className="avatar-box">
          <div className="avatar-large"></div>
          <p className="role">Khách hàng</p>
        </div>

        <div className="profile-form">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Tên" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Mật khẩu mới" />

          <button onClick={handleSubmit}>Cập nhật</button>
        </div>
      </div>

      {/* ORDERS */}
      <div className="order-history">
        <h3>Lịch sử đơn hàng</h3>

        <div className="order-list">
          {orders.map((o) => (
            <div className="order-item" key={o._id}>
              <div>
                <p className="order-id">{o._id.slice(-6)}</p>
                <span>{new Date(o.createdAt).toLocaleDateString()}</span>
              </div>

              <div>
                <p>{o.totalAmount.toLocaleString()}đ</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}