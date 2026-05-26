import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function TableCard({ table, onEdit, onDelete }) {
  return (
    <div
      style={{
        ...styles.card,
        borderColor:
          table.status === "available" ? "#22c55e" : "#ef4444",
      }}
    >
      <h3>{table.name}</h3>

      <p style={{ fontSize: 12, color: "#666" }}>
        Code: {table.code}
      </p>

      {/* trạng thái */}
      <div
        style={{
          ...styles.status,
          background:
            table.status === "available" ? "#dcfce7" : "#fee2e2",
          color:
            table.status === "available" ? "#166534" : "#991b1b",
        }}
      >
        {table.status === "available" ? "Trống" : "Có khách"}
      </div>

      {/* QR */}
      {table.qrCode && (
        <img src={table.qrCode} alt="QR" style={styles.qr} />
      )}

      {/* actions */}
      <div style={styles.actions}>
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

const styles = {
  card: {
    border: "2px solid",
    borderRadius: 12,
    padding: 15,
    position: "relative",
    background: "#fff",
  },
  status: {
    padding: "4px 10px",
    borderRadius: 20,
    display: "inline-block",
    fontSize: 12,
    marginTop: 8,
  },
  qr: {
    width: 80,
    marginTop: 10,
  },
  actions: {
    position: "absolute",
    top: 10,
    right: 10,
    display: "flex",
    gap: 5,
  },
};