const categories = [
  "Tất cả",
  "Bánh",
  "Cafe",
  "Trà sữa",
  "Gà rán",
];

export default function CategoryFilter({ category, setCategory }) {
  return (
    <div style={styles.wrapper}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          style={{
            ...styles.btn,
            background: category === cat ? "#000" : "#eee",
            color: category === cat ? "#fff" : "#333",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  btn: {
    border: "none",
    padding: "8px 14px",
    borderRadius: 20,
    cursor: "pointer",
    fontSize: 13,
  },
};