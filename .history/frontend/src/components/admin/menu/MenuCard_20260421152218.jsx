import { FiEdit2, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";

export default function MenuCard({ item, onEdit, onDelete, onToggle }) {
  return (
    <div style={styles.card}>
      <img src={item.image} alt={item.name} style={styles.image} />

      <div style={styles.info}>
        <h4 style={{ margin: 0 }}>{item.name}</h4>
        <p style={{ margin: "4px 0", color: "#555" }}>
          {item.price.toLocaleString()} đ
        </p>
        <small style={{ color: "#999" }}>{item.category}</small>
      </div>

      {/* 🔥 actions */}
      <div style={styles.actions}>
        <button onClick={() => onEdit(item)}>
          <FiEdit2 />
        </button>

        <button onClick={() => onDelete(item._id)}>
          <FiTrash2 />
        </button>

        <button onClick={() => onToggle(item._id)}>
          {item.isActive ? <FiEye /> : <FiEyeOff />}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  image: {
    width: "100%",
    height: 120,
    objectFit: "cover",
    opacity: (item) => (item?.isActive ? 1 : 0.5),
  },
  info: {
    padding: 10,
  },
  actions: {
    position: "absolute",
    top: 8,
    right: 8,
    display: "flex",
    gap: 5,
  },
};