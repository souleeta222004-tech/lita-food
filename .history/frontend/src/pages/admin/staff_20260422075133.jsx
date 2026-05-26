import { useState, useMemo } from "react";
import StaffForm from "../../components/admin/StaffForm";
import "../../assets/style/admin/staff.css";

export default function StaffPage() {
  const [staffs, setStaffs] = useState([
    {
      _id: "1",
      name: "Admin",
      email: "admin@gmail.com",
      role: "admin",
      isActive: true,
    },
    {
      _id: "2",
      name: "Nhân viên A",
      email: "staff@gmail.com",
      role: "staff",
      isActive: true,
    },
  ]);

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return staffs.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [staffs, search]);

  const handleSubmit = (data) => {
    if (selected) {
      setStaffs((prev) =>
        prev.map((s) =>
          s._id === selected._id ? { ...s, ...data } : s
        )
      );
    } else {
      setStaffs((prev) => [
        { ...data, _id: Date.now().toString(), isActive: true },
        ...prev,
      ]);
    }

    setSelected(null);
  };

  const handleToggle = (id) => {
    setStaffs((prev) =>
      prev.map((s) =>
        s._id === id ? { ...s, isActive: !s.isActive } : s
      )
    );
  };

  return (
    <div className="staff-page">
      <h2 className="title">Nhân viên</h2>

      <input
        className="search"
        placeholder="Tìm nhân viên..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="content">
        {/* TABLE */}
        <div className="left">
          <table className="table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.role}</td>

                  <td>
                    <span
                      className={`badge ${
                        s.isActive ? "active" : "inactive"
                      }`}
                    >
                      {s.isActive ? "Hoạt động" : "Khóa"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn edit"
                      onClick={() => setSelected(s)}
                    >
                      Sửa
                    </button>

                    <button
                      className="btn toggle"
                      onClick={() => handleToggle(s._id)}
                    >
                      {s.isActive ? "Khóa" : "Mở"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 📱 Mobile */}
          <div className="mobile-list">
            {filtered.map((s) => (
              <div key={s._id} className="card">
                <h4>{s.name}</h4>
                <p>{s.email}</p>
                <p>Role: {s.role}</p>
                <span
                  className={`badge ${
                    s.isActive ? "active" : "inactive"
                  }`}
                >
                  {s.isActive ? "Hoạt động" : "Khóa"}
                </span>

                <div className="card-actions">
                  <button
                    className="btn edit"
                    onClick={() => setSelected(s)}
                  >
                    Sửa
                  </button>

                  <button
                    className="btn toggle"
                    onClick={() => handleToggle(s._id)}
                  >
                    {s.isActive ? "Khóa" : "Mở"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FORM */}
        <div className="right">
          <h3>{selected ? "Cập nhật" : "Thêm nhân viên"}</h3>
          <StaffForm selected={selected} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}