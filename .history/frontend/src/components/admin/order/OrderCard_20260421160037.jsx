import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard({ order, onSelect }) {
  return (
    <div style={styles.card} onClick={() => onSelect(order)}>
      <h4 style={{ margin: 0 }}>
        {order.table?.name || "Không rõ bàn"}
      </h4>

      <p style={{ margin: "5px 0", fontSize: 13 }}>
        {order.totalAmount.toLocaleString()}đ
      </p>

      <div style={styles.row}>
        <OrderStatusBadge status={order.status} />

        <span
          style={{
            fontSize: 12,
            color:
              order.paymentStatus === "paid" ? "green" : "red",
          }}
        >
          {order.paymentStatus === "paid"
            ? "Đã thanh toán"
            : "Chưa thanh toán"}
        </span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: 12,
    borderRadius: 10,
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    cursor: "pointer",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 8,
  },
};