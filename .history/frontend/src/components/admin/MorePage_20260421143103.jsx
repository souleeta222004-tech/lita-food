export default function MorePage() {
  return (
    <div className="more-page">
      <h2>Quản lý khác</h2>

      <div className="grid">
        <NavLink to="/admin/customers">Khách hàng</NavLink>
        <NavLink to="/admin/staff">Nhân viên</NavLink>
        <NavLink to="/admin/payments">Thanh toán</NavLink>
        <NavLink to="/admin/invoices">Hóa đơn</NavLink>
      </div>
    </div>
  );
}