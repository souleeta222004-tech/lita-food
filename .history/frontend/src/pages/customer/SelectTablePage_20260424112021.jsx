import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../assets/style/customer/selectTable.css";
import { getTables } from "../../services/tables.service";

export default function SelectTablePage() {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);

  // load tables from backend
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await getTables();
        setTables(res.data.data);
      } catch (err) {
        console.log("Error loading tables:", err);
      }
    };

    fetchTables();
  }, []);

  // chọn bàn
  const handleSelect = (table) => {
    navigate(`/menu?table=${table._id}`);
  };

  return (
    <div className="select-table-page">
      <h2>Chọn bàn của bạn</h2>

      <div className="table-grid">
        {tables.map((table) => (
          <div
            key={table._id}
            className="table-card"
            onClick={() => handleSelect(table)}
          >
            🪑
            <p>{table.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}