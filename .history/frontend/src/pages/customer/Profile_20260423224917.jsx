import { useState, useEffect } from "react";
import "../../assets/style/customer/profile.css";

import {
  getProfileApi,
  updateProfileApi
} from "../../services/auth.service";

import {  } from "../../services/auth.service.js";

export default function CustomerProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [orders, setOrders] = useState([]);

  // ================= LOAD PROFILE (GIỐNG STAFF) =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileApi();
        const user = res.data.data;

        setForm({
          name: user.name || "",
          email: user.email || "",
          password: "",
        });
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
      await updateProfileApi({
        name: form.name,
        password: form.password || undefined,
      });

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
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="email" value={form.email} disabled />
          <input name="password" value={form.password} onChange={handleChange} />

          <button onClick={handleSubmit}>Cập nhật</button>
        </div>
      </div>

      {/* ORDERS */}
      <div className="order-history">
        <h3>Lịch sử đơn hàng</h3>

        <div className="order-list">
          {orders.map((o) => (
            <div key={o._id} className="order-item">
              <div>
                <p>{o._id.slice(-6)}</p>
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