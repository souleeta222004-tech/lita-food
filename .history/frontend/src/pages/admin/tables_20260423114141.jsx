//frontend/src/pages/admin/tables.jsx
import { useState, useMemo, useEffect } from "react";
import { getTables, createTable, deleteTable } from "../../services/tables.service.js";
import TableGrid from "../../components/admin/table/TableGrid";
import TableEditorPanel from "../../components/admin/table/TableEditorPanel";
import TableFilter from "../../components/admin/table/TableFilter";
import "../../assets/style/admin/table.css";
export default function Tables() {

  cuseEffect(() => {
  fetchTables();
}, []);

const fetchTables = async () => {
  const res = await getTables();
  setTables(res.data.data);
};

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
  const handleSubmit = async (data) => {
  if (selectedTable) {
    await updateTable(selectedTable._id, data);
  } else {
    await createTable(data);
  }

  fetchTables();
  setSelectedTable(null);
};

  // ➕ add / update
  const handleSubmit = async (data) => {
  if (selectedTable) {
    await updateTable(selectedTable._id, data);
  } else {
    await createTable(data);
  }

  fetchTables();
  setSelectedTable(null);
};

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

