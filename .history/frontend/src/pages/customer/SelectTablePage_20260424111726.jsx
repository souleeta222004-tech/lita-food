// frontend/src/pages/customer/SelectTablePage.jsx
import { useNavigate } from "react-router-dom";

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