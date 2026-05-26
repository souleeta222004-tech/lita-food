//frontend/src/pages/customer/Order.jsx
import { useState, useMemo } from "react";
import {  } from "react";
import { getOrders } from "../../services/order.service";
import OrderList from "../../components/admin/order/OrderList";
import OrderDetail from "../../components/admin/order/OrderDetail";
import OrderFilter from "../../components/admin/order/OrderFilter";
import { useSearchParams } from "react-router-dom";
import "../../assets/style/admin/order.css";

export default function CustomerOrders() {
  
  const [params] = useSearchParams();
  const tableId = params.get("table");
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