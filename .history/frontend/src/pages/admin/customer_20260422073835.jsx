//frontend/src/pages/admin/customer.jsx
import { useState, useMemo } from "react";

export default function CustomerPage() {
  // 🔥 Fake data (sau nối API)
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

  // 🔍 search
  const filtered = useMemo(() => {
    return customers.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Khách hàng</h2>

      {/* 🔍 Search */}
      <input
        placeholder="Tìm khách hàng..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* 📋 Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
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
    </div>
  );
}
