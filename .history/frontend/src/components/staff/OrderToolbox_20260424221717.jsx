export default function OrderToolbox({
  cart,
  tables,
  selectedTable,
  setSelectedTable,
  customer,
  setCustomer,
  onCheckout,
  loading,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="order-toolbox">

      {/* TABLE */}
      <select
        value={selectedTable}
        onChange={(e) => setSelectedTable(e.target.value)}
      >
        <option value="">-- Chọn bàn --</option>

        {tables.map((t) => (
          <option key={t._id} value={t._id}>
            {t.name}
          </option>
        ))}
      </select>

      {/* CUSTOMER (STAFF ONLY) */}
      <input
        type="text"
        placeholder="Tên khách (bắt buộc với staff)"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />

      {/* TOTAL */}
      <div className="order-total">
        Tổng: {total.toLocaleString()} đ
      </div>

      {/* BUTTON */}
      <button
        className="checkout-btn"
        onClick={onCheckout}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Tạo đơn"}
      </button>
    </div>
  );
}