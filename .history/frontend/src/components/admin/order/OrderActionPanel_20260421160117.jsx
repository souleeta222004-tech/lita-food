export default function OrderActionPanel({
  order,
  onUpdateStatus,
  onPay,
}) {
  if (!order) return null;

  return (
    <div style={styles.wrapper}>
      <h4>Hành động</h4>

      <div style={styles.actions}>
        <button onClick={() => onUpdateStatus("confirmed")}>
          Confirm
        </button>
        <button onClick={() => onUpdateStatus("preparing")}>
          Preparing
        </button>
        <button onClick={() => onUpdateStatus("ready")}>
          Ready
        </button>
        <button onClick={() => onUpdateStatus("completed")}>
          Complete
        </button>
        <button onClick={() => onUpdateStatus("cancelled")}>
          Cancel
        </button>
      </div>

      <button style={styles.payBtn} onClick={onPay}>
        {order.paymentStatus === "paid"
          ? "Đã thanh toán"
          : "Thanh toán"}
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    marginTop: 20,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  payBtn: {
    width: "100%",
    padding: 10,
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};