export default function OrderFilter({ status, setStatus }) {
  const options = [
    "all",
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "completed",
    "cancelled",
  ];

  return (
    <div style={styles.wrapper}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setStatus(opt)}
          style={{
            ...styles.btn,
            background: status === opt ? "#000" : "#eee",
            color: status === opt ? "#fff" : "#333",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 15,
  },
  btn: {
    border: "none",
    padding: "6px 12px",
    borderRadius: 20,
    cursor: "pointer",
    fontSize: 12,
  },
};