import { useState, useMemo } from "react";
import OrderList from "../../components/admin/order/OrderList";
import OrderDetail from "../../components/admin/order/OrderDetail";
import OrderFilter from "../../components/admin/order/OrderFilter";
import OrderActionPanel from "../../components/admin/order/OrderActionPanel";
import "../../"

export default function Orders() {
  // 🔥 Fake data (sau thay API)
  const [orders, setOrders] = useState([
    {
      _id: "1",
      table: { name: "Bàn 1" },
      items: [
        { name: "Trà sữa", price: 30000, quantity: 2 },
        { name: "Gà rán", price: 50000, quantity: 1 },
      ],
      totalAmount: 110000,
      status: "pending",
      paymentStatus: "unpaid",
      note: "Ít đá",
    },
    {
      _id: "2",
      table: { name: "Bàn 2" },
      items: [
        { name: "Cafe", price: 25000, quantity: 1 },
      ],
      totalAmount: 25000,
      status: "preparing",
      paymentStatus: "paid",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  // 🔍 filter
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter === "all") return true;
      return o.status === statusFilter;
    });
  }, [orders, statusFilter]);

  // 👁 select order
  const handleSelect = (order) => {
    setSelectedOrder(order);
  };

  // 🔄 update status
  const handleUpdateStatus = (status) => {
    if (!selectedOrder) return;

    setOrders((prev) =>
      prev.map((o) =>
        o._id === selectedOrder._id ? { ...o, status } : o
      )
    );

    setSelectedOrder((prev) => ({ ...prev, status }));
  };

  // 💳 thanh toán
  const handlePay = () => {
    if (!selectedOrder) return;

    setOrders((prev) =>
      prev.map((o) =>
        o._id === selectedOrder._id
          ? { ...o, paymentStatus: "paid" }
          : o
      )
    );

    setSelectedOrder((prev) => ({
      ...prev,
      paymentStatus: "paid",
    }));
  };

  return (
    <div style={styles.page}>
      <h2>Quản lý đơn hàng</h2>

      {/* 🔍 filter */}
      <OrderFilter
        status={statusFilter}
        setStatus={setStatusFilter}
      />

      <div style={styles.content}>
        {/* 🟩 LEFT: list */}
        <div style={styles.left}>
          <OrderList
            orders={filteredOrders}
            onSelect={handleSelect}
          />
        </div>

        {/* 🟪 RIGHT: detail + action */}
        <div style={styles.right}>
          <OrderDetail order={selectedOrder} />

          <OrderActionPanel
            order={selectedOrder}
            onUpdateStatus={handleUpdateStatus}
            onPay={handlePay}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: 20,
    background: "#f9f9f9",
    minHeight: "100vh",
  },
  content: {
    display: "flex",
    gap: 20,
  },
  left: {
    width: "60%",
  },
  right: {
    width: "40%",
    background: "#fff",
    padding: 15,
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    height: "fit-content",
  },
};