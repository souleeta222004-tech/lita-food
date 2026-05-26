import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import "../../assets/style/admin/analytics.css";

export default function Analytics() {
  const revenueData = [
    { name: "T2", revenue: 1200000 },
    { name: "T3", revenue: 2100000 },
    { name: "T4", revenue: 1800000 },
    { name: "T5", revenue: 2500000 },
    { name: "T6", revenue: 3000000 },
    { name: "T7", revenue: 4200000 },
    { name: "CN", revenue: 3800000 },
  ];

  const topProducts = [
    { name: "Trà sữa", sold: 120 },
    { name: "Cà phê", sold: 98 },
    { name: "Matcha", sold: 86 },
    { name: "Bánh ngọt", sold: 72 },
  ];

  return (
    <div className="analytics">
      <h1>📊 Thống kê Dashboard</h1>

      {/* Stats */}
      <div className="stats">
        <div className="card">💰 12,500,000 VNĐ</div>
        <div className="card">🧾 120 đơn</div>
        <div className="card">📈 +15%</div>
      </div>

      {/* Charts */}
      <div className="charts">
        <div className="chart-container">
          <h2>Doanh thu</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h2>Món bán chạy</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}