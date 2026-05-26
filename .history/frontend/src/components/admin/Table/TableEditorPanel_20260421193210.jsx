import TableForm from "./TableForm";

export default function TableEditorPanel({ selected, onSubmit }) {
  return (
    <div style={styles.panel}>
      <TableForm selected={selected} onSubmit={onSubmit} />
    </div>
  );
}

