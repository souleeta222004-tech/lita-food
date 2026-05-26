import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerTables } from "../../services/tables.service";
import "../../assets/style/customer/selectTable.css";

export default function SelectTablePage() {
  const navigate = useNavigate();

  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👉 gọi API
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await getTables();
        setTables(res.data.data);
      } catch (err) {
        console.error("Lỗi lấy bàn:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  const handleSelect = (tableId) => {
    navigate(`/menu?table=${tableId}`);
  };

  if (loading) return <p>Đang tải bàn...</p>;

  return (
    <div className="select-table-page">
      <h2>Chọn bàn của bạn</h2>

      <div className="table-grid">
        {tables.map((table) => (
          <div
            key={table._id} // ⚠️ dùng _id từ Mongo
            className="table-card"
            onClick={() => handleSelect(table._id)}
          >
            🪑
            <p>{table.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}