//frontend/src/pages/admin/tables.jsx
import { useState, useMemo } from "react";
import TableGrid from "../../components/admin/table/TableGrid";
import TableEditorPanel from "../../components/admin/table/TableEditorPanel";
import TableFilter from "../../components/admin/table/TableFilter";
import "../../assets/style/admin/table.css";
export default function Tables() {
  // 🔥 Fake data
  const [tables, setTables] = useState([
    {
      _id: "1",
      name: "Bàn 1",
      code: "T1",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=T1",
      status: "available",
    },
    {
      _id: "2",
      name: "Bàn 2",
      code: "T2",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=T2",
      status: "occupied",
    },
  ]);

  const [selectedTable, setSelectedTable] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  // 🔍 filter
  const filteredTables = useMemo(() => {
    return tables.filter((t) => {
      if (statusFilter === "all") return true;
      return t.status === statusFilter;
    });
  }, [tables, statusFilter]);

  // ✏️ edit
  const handleEdit = (table) => {
    setSelectedTable(table);
  };

  // 🗑 delete
  const handleDelete = (id) => {
    const confirm = window.confirm("Xóa bàn này?");
    if (!confirm) return;

    setTables((prev) => prev.filter((t) => t._id !== id));
  };

  // ➕ add / update
  const handleSubmit = (data) => {
    if (selectedTable) {
      // update
      setTables((prev) =>
        prev.map((t) =>
          t._id === selectedTable._id ? { ...t, ...data } : t
        )
      );
    } else {
      // auto tạo QR từ code
      const qr = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${data.code}`;

      const newTable = {
        ...data,
        _id: Date.now().toString(),
        qrCode: qr,
      };

      setTables((prev) => [newTable, ...prev]);
    }

    setSelectedTable(null);
  };

  return (
 return (
  <div className="table-page">
    <h2>Quản lý bàn</h2>

    <TableFilter
      status={statusFilter}
      setStatus={setStatusFilter}
    />

    <div className="table-content">
      {/* LEFT */}
      <div className="table-left">
        <TableGrid
          tables={filteredTables}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* RIGHT */}
      <div className="table-right">
        <TableEditorPanel
          selected={selectedTable}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  </div>
  );
}

const styles = {
  page: {
    padding: 20,
    background: "#f9f9f9",
    minHeight: "100vh",
  },
  content: {
    display: "flex",
    gap: 20,
  },
  left: {
    width: "70%",
  },
};