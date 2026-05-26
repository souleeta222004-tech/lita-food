import { NavLink, Outlet } from "react-router-dom";
import "../assets/style/admin/adminLayout.css";
import logoLITA from "../assets/img/LOGOLITA-preview.png";
import { 
  FiBarChart2,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiGrid,
  FiUser,
  FiCreditCard,
  FiFileText
} from "react-icons/fi";

export default function AdminLayout() {
  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        {/* LOGO */}
        <div className="logo-box">
          <img src={logoLITA} className="logo" alt="LITA" />
        </div>

        {/* NAV */}
        <nav>
          <NavLink to="/admin/analytics">
            <FiBarChart2 /> Thống kê
          </NavLink>

          <NavLink to="/admin/products">
            <FiBox /> Sản phẩm
          </NavLink>

          <NavLink to="/admin/orders">
            <FiShoppingCart /> Order
          </NavLink>

          <NavLink to="/admin/customers">
            <FiUsers /> Khách hàng
          </NavLink>

          <NavLink to="/admin/tables">
            <FiGrid /> Bàn
          </NavLink>

          <NavLink to="/admin/staff">
            <FiUser /> Nhân viên
          </NavLink>

          <NavLink to="/admin/payments">
            <FiCreditCard /> Thanh toán
          </NavLink>

          <NavLink to="/admin/invoices">
            <FiFileText /> Hóa đơn
          </NavLink>
        </nav>

        {/* USER CARD */}
        <div className="user-card">
          <div className="avatar"></div>
          <div>
            <p className="name">Admin LITA</p>
            <span className="role">Quản trị viên</span>
          </div>
        </div>

      </aside>

      {/* MAIN */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* MOBILE BOTTOM NAV */}
<nav className="bottom-nav">
  <NavLink to="/admin/analytics">
            <FiBarChart2 /> 
          </NavLink>

          <NavLink to="/admin/products">
            <FiBox />
          </NavLink>

          <NavLink to="/admin/orders">
            <FiShoppingCart />
          </NavLink>

          <NavLink to="/admin/customers">
            <FiUsers />
          </NavLink>

          <NavLink to="/admin/tables">
            <FiGrid />
          </NavLink>

          <NavLink to="/admin/staff">
            <FiUser />
          </NavLink>

          <NavLink to="/admin/payments">
            <FiCreditCard /> 
          </NavLink>

          <NavLink to="/admin/invoices">
            <FiFileText />
          </NavLink>
</nav>

    </div>
  );
}