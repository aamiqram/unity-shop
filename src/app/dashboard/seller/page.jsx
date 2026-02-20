"use client";
import {
  FiDollarSign,
  FiShoppingBag,
  FiPackage,
  FiStar,
  FiTrendingUp,
  FiMessageSquare,
} from "react-icons/fi";
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
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
];

const stats = [
  {
    label: "Total Sales",
    value: "$45,678",
    change: "+12%",
    icon: FiDollarSign,
  },
  { label: "Orders", value: "342", change: "+8%", icon: FiShoppingBag },
  { label: "Products", value: "56", change: "+3", icon: FiPackage },
  { label: "Store Rating", value: "4.8", icon: FiStar, sub: "(128 reviews)" },
];

export default function SellerDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg border flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              {stat.change && (
                <p className="text-xs text-green-600">
                  {stat.change} vs last month
                </p>
              )}
            </div>
            <stat.icon className="text-3xl text-orange/50" />
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-4 rounded-lg border mb-6">
        <h2 className="font-semibold mb-4">Sales Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
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

      {/* Recent orders & top products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border">
          <h2 className="font-semibold mb-4">Recent Orders</h2>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1234</td>
                <td>John Doe</td>
                <td>$129.99</td>
                <td>
                  <span className="bg-yellow-100 px-2 py-1 rounded">
                    Processing
                  </span>
                </td>
              </tr>
              <tr>
                <td>#1235</td>
                <td>Jane Smith</td>
                <td>$89.50</td>
                <td>
                  <span className="bg-green-100 px-2 py-1 rounded">
                    Shipped
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h2 className="font-semibold mb-4">Top Products</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="flex-1">Wireless Earbuds</span>
              <span>45 sold</span>
            </div>
            <div className="flex items-center">
              <span className="flex-1">Smart Watch</span>
              <span>32 sold</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
