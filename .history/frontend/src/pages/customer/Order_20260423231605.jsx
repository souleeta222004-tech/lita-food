import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// ✅ dùng service mới
import { getCustomerOrders } from "../../services/customer.service";

import OrderList from "../../components/admin/order/OrderList";
import OrderDetail from "../../components/admin/order/OrderDetail";
import OrderFilter from "../../components/admin/order/OrderFilter";

import "../../assets/style/admin/order.css";

export default function CustomerOrders() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // ================= CORE =================
  const tableId =
    params.get("table") || localStorage.getItem("tableId");

  const customerId =
    localStorage.getItem("customerId");

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [mobileView, setMobileView] = useState("list");
  const [loading, setLoading] = useState(true);

  // ================= VALIDATE =================
  useEffect(() => {
    if (!tableId || !customerId) {
      return navigate("/select-table");
    }
  }, [tableId, customerId]);

  // ================= FETCH ORDERS =================
  useEffect(() => {
    if (!tableId || !customerId) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await getCustomerOrders(
          tableId,
          customerId
        );

        const data = res.data.data || [];

        setOrders(data);

        // 🔥 auto chọn order mới nhất
        if (data.length > 0) {
          setSelectedOrder(data[0]);
        }
      } catch (err) {
        console.error("ORDER ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [tableId, customerId]);

  // ================= FILTER =================
  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  // ================= SELECT =================
  const handleSelect = (order) => {
    setSelectedOrder(order);
    setMobileView("detail");
  };

  // ================= EMPTY =================
  if (loading) return <p>Đang tải đơn hàng...</p>;

  if (!orders.length) {
    return (
      <div className="order-page">
        <h2>Đơn hàng của bạn</h2>
        <p>Chưa có đơn nào.</p>

        <button onClick={() => navigate("/menu")}>
          ← Quay lại gọi món
        </button>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="order-page">
      <h2>Đơn hàng của bạn</h2>

      <OrderFilter
        status={statusFilter}
        setStatus={setStatusFilter}
      />

      <div className="order-content">
        {/* LEFT */}
        <div
          className={`order-left ${
            mobileView === "detail" ? "hide-mobile" : ""
          }`}
        >
          <OrderList
            orders={filteredOrders}
            onSelect={handleSelect}
          />
        </div>

        {/* RIGHT */}
        <div
          className={`order-right ${
            mobileView === "list" ? "hide-mobile" : ""
          }`}
        >
          <button
            className="back-btn"
            onClick={() => setMobileView("list")}
          >
            ← Quay lại
          </button>

          <OrderDetail order={selectedOrder} />
        </div>
      </div>
    </div>
  );
}