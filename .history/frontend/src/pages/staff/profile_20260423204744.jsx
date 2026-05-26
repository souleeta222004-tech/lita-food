import { useState, useEffect } from "react";
import {
  getProfileApi,
  updateProfileApi,
} from "../../services/auth.service";
import "../../assets/style/staff/profile.css";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 LOAD PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileApi();
        const user = res.data.data;

        setForm({
          name: user.name,
          email: user.email,
          password: "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 UPDATE PROFILE
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        name: form.name,
      };

      // chỉ gửi password nếu có nhập
      if (form.password) {
        payload.password = form.password;
      }

      await updateProfileApi(payload);

      alert("Cập nhật thành công!");
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* avatar */}
        <div className="avatar-box">
          <div className="avatar-large"></div>
          <p className="role">Nhân viên</p>
        </div>

        {/* form */}
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
            disabled // ⚠️ không cho sửa email
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Mật khẩu mới (optional)"
          />

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
}