import { useState, useEffect, useMemo } from "react";
import { getInvoices } from "../../services/invoice.service";
import "../../assets/style/admin/invoices.css";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filter, setFilter] = useState("all");

  // ================= FETCH =================
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await getInvoices();
      setInvoices(res.data.data);
    } catch (err) {
      console.error("Fetch invoices error:", err);
    }
  };

  // ================= FILTER =================
  const filtered = useMemo(() => {
    if (filter === "all") return invoices;
    return invoices.filter((inv) => inv.paymentStatus === filter);
  }, [invoices, filter]);

  const renderStatus = (status) => {
    switch (status) {
      case "paid":
        return "Đã thanh toán";
      case "pending":
        return "Chờ thanh toán";
      case "failed":
        return "Thất bại";
      default:
        return status;
    }
  };

  return (
  <div className="staff-page">
    <h2 className="title">Nhân viên</h2>

    <input
      className="search"
      placeholder="Tìm..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <div className="content">
      {/* LEFT */}
      <div className="left">
        <table className="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
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
                  <span className={`badge ${s.isActive ? "active" : "inactive"}`}>
                    {s.isActive ? "Active" : "Blocked"}
                  </span>
                </td>

                <td>
                  <button className="btn edit" onClick={() => setSelected(s)}>
                    Edit
                  </button>

                  <button
                    className="btn toggle"
                    onClick={() => handleToggle(s._id, s.isActive)}
                  >
                    {s.isActive ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RIGHT */}
      <div className="right">
        <StaffForm selected={selected} onSubmit={handleSubmit} />
      </div>
    </div>
  </div>
);
}