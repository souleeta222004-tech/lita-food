import MenuCard from "./MenuCard";

export default function MenuGrid({ menus, onEdit }) {
  return (
    <div style={styles.grid}>
      {menus.map((item) => (
        <MenuCard key={item._id} item={item} onEdit={onEdit} />
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