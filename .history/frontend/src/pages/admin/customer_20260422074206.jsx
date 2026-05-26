import { useState, useMemo } from "react";
import "../../assets/"

export default function CustomerPage() {
  const [customers] = useState([
    {
      _id: "1",
      name: "Nguyễn Văn A",
      phone: "0901234567",
      totalOrders: 5,
      totalSpent: 500000,
    },
    {
      _id: "2",
      name: "Trần Thị B",
      phone: "0987654321",
      totalOrders: 2,
      totalSpent: 150000,
    },
  ]);

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return customers.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  return (
    <div className="customer-page">
      <h2 className="title">Khách hàng</h2>

      {/* 🔍 Search */}
      <input
        className="search"
        placeholder="Tìm khách hàng..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📋 Table */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>SĐT</th>
              <th>Số đơn</th>
              <th>Tổng chi</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.totalOrders}</td>
                <td>{c.totalSpent.toLocaleString()}đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Card */}
      <div className="mobile-list">
        {filtered.map((c) => (
          <div key={c._id} className="card">
            <h4>{c.name}</h4>
            <p>📞 {c.phone}</p>
            <p>🧾 {c.totalOrders} đơn</p>
            <p>💰 {c.totalSpent.toLocaleString()}đ</p>
          </div>
        ))}
      </div>
    </div>
  );
}