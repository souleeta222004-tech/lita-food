// MenuEditorPanel.jsx
import MenuForm from "./MenuForm";

export default function TableEditorPanel({ selected, onSubmit }) {
  return (
    <div className="table-panel">
      <TableForm selected={selected} onSubmit={onSubmit} />
    </div>
  );
}

