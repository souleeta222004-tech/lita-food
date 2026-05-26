import OrderItemRow from "./OrderItemRow";

export default function OrderDetail({ order }) {
  if (!order) {
    return <p>Chọn đơn để xem chi tiết</p>;
  }

  return (
    <div>
      <h3>{order.table?.name}</h3>

      <div style={{ marginTop: 10 }}>
        {order.items.map((item, i) => (
          <OrderItemRow key={i} item={item} />
        ))}
      </div>

      <h4 style={{ marginTop: 15 }}>
        Tổng: {order.totalAmount.toLocaleString()}đ
      </h4>

      {order.note && (
        <p style={{ fontSize: 13 }}>Ghi chú: {order.note}</p>
      )}
    </div>
  );
}