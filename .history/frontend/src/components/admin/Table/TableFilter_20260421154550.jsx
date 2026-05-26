export default function TableFilter({ status, setStatus }) {
  const options = ["all", "available", "occupied"];

  return (
    <div style={{ marginBottom: 15 }}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setStatus(opt)}
          style={{
            marginRight: 10,
            padding: "6px 12px",
            borderRadius: 20,
            border: "none",
            background: status === opt ? "#000" : "#eee",
            color: status === opt ? "#fff" : "#333",
          }}
        >
          {opt === "all"
            ? "Tất cả"
            : opt === "available"
            ? "Trống"
            : "Có khách"}
        </button>
      ))}
    </div>
  );
}