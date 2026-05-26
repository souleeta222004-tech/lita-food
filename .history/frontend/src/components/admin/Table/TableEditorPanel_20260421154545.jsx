import TableForm from "./TableForm";

export default function TableEditorPanel({ selected, onSubmit }) {
  return (
    <div style={styles.panel}>
      <TableForm selected={selected} onSubmit={onSubmit} />
    </div>
  );
}

const styles = {
  panel: {
    width: "30%",
    background: "#fff",
    padding: 15,
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    height: "fit-content",
  },
};