// MenuEditorPanel.jsx
import MenuForm from "./MenuForm";

export default function MenuEditorPanel({ selected, onSubmit }) {
  return (
    <div style={styles.panel}>
      <MenuForm selected={selected} onSubmit={onSubmit} />
    </div>
  );
}

