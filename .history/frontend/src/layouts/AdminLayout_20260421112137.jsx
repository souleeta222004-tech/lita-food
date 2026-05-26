import { NavLink, Outlet } from "react-router-dom";
import "../assets/style/admin/adminLayout.css";
import imgCuaHang from "../assets/img/thiet-ke-cua-hang-thuc-an-nhanh.jpg";
export default function AdminLayout() {
  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">LITA ADMIN</h2>

        <nav>
          <NavLink to="/admin/analytics">Thống kê</NavLink>
          <NavLink to="/admin/products">Sản phẩm</NavLink>
          <NavLink to="/admin/orders">Bán hàng / Order</NavLink>
          <NavLink to="/admin/customers"> Khách hàng</NavLink>
          <NavLink to="/admin/tables">Bàn</NavLink>
          <NavLink to="/admin/staff">Nhân viên</NavLink>
          <NavLink to="/admin/payments">Thanh toán</NavLink>
          <NavLink to="/admin/invoices">Hóa đơn</NavLink>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
}