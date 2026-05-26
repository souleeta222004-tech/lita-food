//
import { NavLink, Outlet } from "react-router-dom";
import "../assets/style/admin/adminLayout.css";
import logoLITA from "../assets/img/LOGOLITA-preview.png";

import * as FiIcons from "react-icons/fi";
import { MAIN_NAV, MORE_NAV } from "../components/admin/AdminNav";
import MorePage from "../components/admin/more";

export default function AdminLayout() {
  const renderIcon = (iconName) => {
    const Icon = FiIcons[iconName];
    return <Icon />;
  };

  return (
    <div className="admin-layout">

      {/* ===== SIDEBAR (DESKTOP) ===== */}
      <aside className="sidebar">
        <div className="logo-box">
          <img src={logoLITA} className="logo" alt="LITA" />
        </div>

        <nav>
          <p className="nav-group">Chính</p>
          {MAIN_NAV.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {renderIcon(item.icon)} {item.label}
            </NavLink>
          ))}

          <p className="nav-group">Khác</p>
          {MORE_NAV.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {renderIcon(item.icon)} {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="user-card">
          <div className="avatar"></div>
          <div>
            <p className="name">Admin LITA</p>
            <span className="role">Quản trị viên</span>
          </div>
        </div>
      </aside>

      {/* ===== MOBILE HEADER ===== */}
      <header className="mobile-header">
        <img src={logoLITA} alt="logo" className="mobile-logo" />

        <div className="mobile-actions">

          <NavLink to="/admin/profile" className="mobile-user">
            <div className="avatar"></div>
            <span className="role">Quản trị viên</span>
          </NavLink>
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <nav className="bottom-nav">
        {MAIN_NAV.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {renderIcon(item.icon)}
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="more-grid">
  {MORE_NAV.map((item) => (
    <NavLink key={item.path} to={item.path} className="more-item">
      {renderIcon(item.icon)}
      <span>{item.label}</span>
    </NavLink>
  ))}
</div>
      </nav>
    </div>
  );
}