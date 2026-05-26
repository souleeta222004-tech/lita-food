import { useState, useEffect } from "react";
import "../../assets/style/customer/profile.css";

import {
  getProfileApi,
  updateProfileApi
} from "../../services/auth.service";

import { getCustomerOrders } from "../../services/order.service";

export default function CustomerProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= PROFILE =================
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
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  // ================= ORDERS =================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getCustomerOrders(); 
        setOrders(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  // ================= UPDATE =================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        name: form.name,
      };

      if (form.password) payload.password = form.password;

      await updateProfileApi(payload);

      alert("Cập nhật thành công!");
      setForm((p) => ({ ...p, password: "" }));
    } catch (err) {
      console.error(err);
      alert("Lỗi cập nhật!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-page">

      <div className="profile-card">
        <div className="avatar-box">
          <div className="avatar-large"></div>
          <p className="role">Khách hàng</p>
        </div>

        <div className="profile-form">
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="email" value={form.email} disabled />
          <input name="password" value={form.password} onChange={handleChange} />

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        </div>
      </div>

      <div className="order-history">
        <h3>Lịch sử đơn hàng</h3>

        {orders.map((o) => (
          <div key={o._id}>
            #{o._id.slice(-6)} - {o.totalAmount.toLocaleString()}đ
          </div>
        ))}
      </div>

    </div>
  );
}