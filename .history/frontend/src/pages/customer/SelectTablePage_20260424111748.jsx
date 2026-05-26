// frontend/src/pages/customer/SelectTablePage.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../assets/style/customer/selectTable.css";
import { getTables } from "../../services/tables.service";

export default function SelectTablePage() {
  const navigate = useNavigate();

 useEffect(() => {
  getTables().then(res => setTables(res.data.data));
}, []);

  const handleSelect = (tableId) => {
    navigate(`/menu?table=${tableId}`);
  };
  export const getTableFromURL = async (search) => {
  const params = new URLSearchParams(search);
  const code = params.get("code");

  if (code) {
    const res = await api.get(`/tables/code/${code}`);
    return res.data.data;
  }

  const tableId = params.get("table");
  if (tableId) {
    return { _id: tableId };
  }

  return null;
};

  return (
    <div className="select-table-page">
      <h2>Chọn bàn của bạn</h2>

      <div className="table-grid">
        {tables.map((table) => (
          <div
            key={table.id}
            className="table-card"
            onClick={() => handleSelect(table.id)}
          >
            🪑
            <p>{table.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}