export default function OrderItemRow({ item }) {
  return (
    <div style={styles.row}>
      <span>{item.name}</span>
      <span>x{item.quantity}</span>
      <span>{item.price.toLocaleString()}đ</span>
      <span>
        {(item.price * item.quantity).toLocaleString()}đ
      </span>
    </div>
  );
}

const styles = {
  row: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: 10,
    padding: "6px 0",
    borderBottom: "1px solid #eee",
    fontSize: 13,
  },
};