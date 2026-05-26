//frontend/src/pages/customer/Order.jsx
import { useEffect, useState, useMemo } from "react";
import { getMyOrders } from "../../services/order.service";
import OrderList from "../../components/admin/order/OrderList";
import OrderDetail from "../../components/admin/order/OrderDetail";
import OrderFilter from "../../components/admin/order/OrderFilter";

import "../../assets/style/admin/order.css";

export default function CustomerOrders() {
  const [orders, setOrders] = useState([
    {
      _id: "1",
      table: { name: "Bàn 1" },
      items: [
        { name: "Trà sữa", price: 30000, quantity: 2 },
      ],
      totalAmount: 60000,
      status: "pending",
      paymentStatus: "unpaid",
    },
    {
      _id: "2",
      table: { name: "Bàn 1" },
      items: [{ name: "Cafe", price: 25000, quantity: 1 }],
      totalAmount: 25000,
      status: "preparing",
      paymentStatus: "paid",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [mobileView, setMobileView] = useState("list");

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  const handleSelect = (order) => {
    setSelectedOrder(order);
    setMobileView("detail");
  };

  return (
    <div className="order-page">
      <h2>Đơn hàng của bạn</h2>

      {/* filter nhẹ */}
      <OrderFilter
        status={statusFilter}
        setStatus={setStatusFilter}
      />

      <div className="order-content">
        {/* LEFT */}
        <div className={`order-left ${mobileView === "detail" ? "hide-mobile" : ""}`}>
          <OrderList orders={filteredOrders} onSelect={handleSelect} />
        </div>

        {/* RIGHT */}
        <div className={`order-right ${mobileView === "list" ? "hide-mobile" : ""}`}>
          <button className="back-btn" onClick={() => setMobileView("list")}>
            ← Quay lại
          </button>

          <OrderDetail order={selectedOrder} />
        </div>
      </div>
    </div>
  );
}