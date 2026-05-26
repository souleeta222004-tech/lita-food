import { FiSearch } from "react-icons/fi";

export default function MenuSearchBar({ search, setSearch }) {
  return (
    <div style={styles.wrapper}>
      <FiSearch style={{ marginLeft: 10, color: "#888" }} />
      <input
        style={styles.input}
        type="text"
        placeholder="Tìm kiếm món ăn..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    background: "#f5f5f5",
    padding: "8px 12px",
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
  },
  input: {
    border: "none",
    outline: "none",
    background: "transparent",
    marginLeft: 8,
    width: "100%",
    fontSize: 14,
  },
};