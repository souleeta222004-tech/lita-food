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
  const [loading, setLoading] = useState(false);

  // ================= PROFILE (GIỐNG STAFF) =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getCustomerProfile();
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

  // ================= ORDERS =================
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

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE PROFILE =================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        name: form.name,
      };

      if (form.password) {
        payload.password = form.password;
      }

      await updateCustomerProfile(payload);

      alert("Cập nhật thành công!");
      setForm((prev) => ({ ...prev, password: "" }));

    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">

      {/* ================= PROFILE (GIỐNG STAFF) ================= */}
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
            disabled
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Mật khẩu mới"
          />

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        </div>
      </div>

      {/* ================= ORDERS ================= */}
      <div className="order-history">

        <h3>Lịch sử đơn hàng</h3>

        <div className="order-list">
          {orders.length === 0 ? (
            <p>Chưa có đơn hàng</p>
          ) : (
            orders.map((o) => (
              <div className="order-item" key={o._id}>
                <div>
                  <p className="order-id">
                    #{o._id.slice(-6)}
                  </p>
                  <span>
                    {new Date(o.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <p className="order-total">
                    {o.totalAmount.toLocaleString()}đ
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}