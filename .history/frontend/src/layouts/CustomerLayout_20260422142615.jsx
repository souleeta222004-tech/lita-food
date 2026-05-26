//frontend/src/layouts/CustomerLayout.jsx
import { NavLink, Outlet } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import logoLITA from "../assets/img/LOGOLITA-preview.png";
import "../assets/style/customer/customerLayout.css";

export default function CustomerLayout() {
  return (
    <div className="customer-layout">
      
      {/* ===== HEADER (mobile + desktop) ===== */}
      <header className="customer-header">
        <img src={logoLITA} className="logo" />

        <div className="header-actions">
          <FiIcons.FiSearch />
          <NavLink to="/cart">
            <FiIcons.FiShoppingCart />
          </NavLink>
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <main className="customer-main">
        <Outlet />
      </main>

      {/* ===== BOTTOM NAV (mobile) ===== */}
      <nav className="customer-bottom-nav">
        <NavLink to="/">
          <FiIcons.FiHome />
          <span>Trang chủ</span>
        </NavLink>

        <NavLink to="/menu">
          <FiIcons.FiGrid />
          <span>Menu</span>
        </NavLink>

        <NavLink to="/cart" className="cart-btn">
          <FiIcons.FiShoppingCart />
          <span>Giỏ</span>
        </NavLink>

        <NavLink to="/orders">
          <FiIcons.FiFileText />
          <span>Đơn</span>
        </NavLink>
      </nav>
    </div>
  );
}