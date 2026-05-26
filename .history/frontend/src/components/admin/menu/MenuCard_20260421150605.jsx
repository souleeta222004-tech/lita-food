import { FiEdit2 } from "react-icons/fi";

export default function MenuCard({ item, onEdit }) {
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

      <button style={styles.editBtn} onClick={() => onEdit(item)}>
        <FiEdit2 />
      </button>
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
  },
  info: {
    padding: 10,
  },
  editBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    border: "none",
    background: "#fff",
    padding: 6,
    borderRadius: 8,
    cursor: "pointer",
  },
};