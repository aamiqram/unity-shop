"use client";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { date: "Mon", sales: 1200 },
  { date: "Tue", sales: 1500 },
  { date: "Wed", sales: 1800 },
  { date: "Thu", sales: 1700 },
  { date: "Fri", sales: 2100 },
  { date: "Sat", sales: 2400 },
  { date: "Sun", sales: 1900 },
];

const topProducts = [
  { name: "Wireless Earbuds", sales: 4500 },
  { name: "Smart Watch", sales: 3200 },
  { name: "Phone Case", sales: 2800 },
];

export default function SellerAnalyticsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {/* Date range selector */}
      <div className="flex justify-end mb-4">
        <select className="border p-2 rounded">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>

      {/* Sales chart */}
      <div className="bg-white p-4 rounded-lg border mb-6">
        <h2 className="font-semibold mb-4">Sales Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#FF6600"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top products */}
      <div className="bg-white p-4 rounded-lg border">
        <h2 className="font-semibold mb-4">Top Products</h2>
        <div className="space-y-2">
          {topProducts.map((p, i) => (
            <div key={i} className="flex items-center">
              <span className="w-32 font-medium">{p.name}</span>
              <div className="flex-1 h-4 bg-gray-200 rounded ml-2">
                <div
                  className="bg-orange h-4 rounded"
                  style={{ width: `${(p.sales / 5000) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2">${p.sales.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
