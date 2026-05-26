import { Outlet } from "react-router-dom";
import "../assets/style/admin/adminLayout.css";
import logoLITA from "../assets/img/LOGOLITA-preview.png";
import AdminNav from "../components/admin/AdminNav";

export default function AdminLayout() {
  return (
    <div className="admin-layout">

      {/* SIDEBAR DESKTOP */}
      <aside className="sidebar">

        <div className="logo-box">
          <img src={logoLITA} className="logo" alt="LITA" />
        </div>

        <div className="sidebar-nav">
          <AdminNav />
        </div>

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
      <div className="mobile-bottom-nav">
        <AdminNav mobile />
      </div>

    </div>
  );
}