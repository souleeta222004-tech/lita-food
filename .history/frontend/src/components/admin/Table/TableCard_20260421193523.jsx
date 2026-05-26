import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function TableCard({ table, onEdit, onDelete }) {
  return (
    <div className={`table-card ${table.status}`}>
      <h3>{table.name}</h3>

      <p className="table-code">Code: {table.code}</p>

      <div className={`table-status ${table.status}`}>
        {table.status === "available" ? "Trống" : "Có khách"}
      </div>

      {table.qrCode && (
        <img src={table.qrCode} alt="QR" className="table-qr" />
      )}

      <div className="table-actions">
        <button onClick={() => onEdit(table)}>
          <FiEdit2 />
        </button>
        <button onClick={() => onDelete(table._id)}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}