//
import { useNavigate } from "react-router-dom";
import "../../assets/style/customer/selectTable.css";

export default function SelectTablePage() {
  const navigate = useNavigate();

  // mock bàn
  const tables = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Bàn ${i + 1}`,
  }));

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