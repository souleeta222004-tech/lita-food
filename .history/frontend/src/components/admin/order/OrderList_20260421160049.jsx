import OrderCard from "./OrderCard";

export default function OrderList({ orders, onSelect }) {
  return (
    <div style={styles.list}>
      {orders.map((o) => (
        <OrderCard key={o._id} order={o} onSelect={onSelect} />
      ))}
    </div>
  );
}

const styles = {
  list: {
    display: "grid",
    gap: 10,
  },
};