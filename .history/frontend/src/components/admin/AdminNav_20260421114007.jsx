import { NavLink } from "react-router-dom";
import {
  FiBarChart2,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiGrid,
} from "react-icons/fi";

export default function AdminNav() {
  return (
    <div className="admin-nav">

      <NavLink to="/admin/analytics">
        <FiBarChart2 />
        <span>Thống kê</span>
      </NavLink>

      <NavLink to="/admin/products">
        <FiBox />
        <span>Sản phẩm</span>
      </NavLink>

      <NavLink to="/admin/orders">
        <FiShoppingCart />
        <span>Order</span>
      </NavLink>

      <NavLink to="/admin/customers">
        <FiUsers />
        <span>KH</span>
      </NavLink>

      <NavLink to="/admin/tables">
        <FiGrid />
        <span>Bàn</span>
      </NavLink>

    </div>
  );
}