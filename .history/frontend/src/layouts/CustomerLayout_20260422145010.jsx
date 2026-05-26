import { NavLink, Outlet } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import logoLITA from "../assets/img/LOGOLITA-preview.png";
import "../assets/style/admin/adminLayout.css";

export default function CustomerLayout() {
  return (
    <div className="admin-layout">
      
      {/* ===== SIDEBAR (desktop) ===== */}
      <aside className="sidebar">
        <div className="logo-box">
          <img src={logoLITA} className="logo" alt="LITA" />
        </div>

        <nav>
          <p className="nav-group">Khách hàng</p>

          <NavLink to="/">
            <FiIcons.FiHome /> Trang chủ
          </NavLink>

          <NavLink to="/menu">
            <FiIcons.FiGrid /> Gọi món
          </NavLink>

          <NavLink to="/orders">
            <FiIcons.FiFileText /> Đơn hàng
          </NavLink>

          <NavLink to="/cart">
            <FiIcons.FiShoppingCart /> Giỏ hàng
          </NavLink>
        </nav>

        {/* user giả lập */}
        <div className="user-card">
          <div className="avatar"></div>
          <div>
            <p className="name">Khách</p>
            <span className="role">Customer</span>
          </div>
        </div>
      </aside>

      {/* ===== MOBILE HEADER ===== */}
      <header className="mobile-header">
        <img src={logoLITA} alt="logo" className="mobile-logo" />

        <div className="mobile-actions">
          <FiIcons.FiSearch />

          <NavLink to="/cart" className="mobile-user">
            <FiIcons.FiShoppingCart />
          </NavLink>
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* ===== MOBILE NAV ===== */}
      <nav className="bottom-nav">
        <NavLink to="/">
          <FiIcons.FiHome />
          <span>Home</span>
        </NavLink>

        <NavLink to="/menu">
          <FiIcons.FiGrid />
          <span>Menu</span>
        </NavLink>

        {/* nút nổi */}
        <NavLink to="/cart">
          <div className="fab-order">
            <FiIcons.FiShoppingCart />
          </div>
        </NavLink>

        <NavLink to="/orders">
          <FiIcons.FiFileText />
          <span>Orders</span>
        </NavLink>
      </nav>
    </div>
  );
}