import { useState, useMemo } from "react";
import OrderList from "../../components/admin/order/OrderList";
import OrderDetail from "../../components/admin/order/OrderDetail";
import OrderFilter from "../../components/admin/order/OrderFilter";
import OrderActionPanel from "../../components/admin/order/OrderActionPanel";
import "../../assets/style/admin/order.css";

export default function Orders() {
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
  };
  

  const handleUpdateStatus = (status) => {
    if (!selectedOrder) return;

    setOrders((prev) =>
      prev.map((o) =>
        o._id === selectedOrder._id ? { ...o, status } : o
      )
    );

    setSelectedOrder((prev) => ({ ...prev, status }));
  };

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
    <div className="order-page">
      <h2>Quản lý đơn hàng</h2>

      <OrderFilter
        status={statusFilter}
        setStatus={setStatusFilter}
      />

      <div className="order-content">
        <div className="order-left">
          <OrderList
            orders={filteredOrders}
            onSelect={handleSelect}
          />
        </div>

        <div className="order-right">
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