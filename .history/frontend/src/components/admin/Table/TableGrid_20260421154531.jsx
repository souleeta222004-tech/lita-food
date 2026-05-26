import TableCard from "./TableCard";

export default function TableGrid({ tables, onEdit, onDelete }) {
  return (
    <div style={styles.grid}>
      {tables.map((t) => (
        <TableCard
          key={t._id}
          table={t}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: 15,
  },
};