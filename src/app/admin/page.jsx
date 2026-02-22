// app/admin/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  FiUsers,
  FiBriefcase,
  FiShoppingBag,
  FiDollarSign,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiBarChart2,
  FiGrid,
  FiPackage,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for admin dashboard
const stats = {
  totalRevenue: 125890.45,
  revenueTrend: 12.8,
  totalOrders: 1543,
  pendingOrders: 32,
  activeUsers: 8750,
  newUsers: 450,
  activeSellers: 234,
  pendingSellers: 8,
};

// Revenue chart data
const revenueData = [
  { name: "Jan", revenue: 42000, orders: 1200 },
  { name: "Feb", revenue: 38000, orders: 1150 },
  { name: "Mar", revenue: 45000, orders: 1320 },
  { name: "Apr", revenue: 47000, orders: 1410 },
  { name: "May", revenue: 52000, orders: 1550 },
  { name: "Jun", revenue: 49000, orders: 1480 },
  { name: "Jul", revenue: 53000, orders: 1620 },
  { name: "Aug", revenue: 58000, orders: 1730 },
  { name: "Sep", revenue: 61000, orders: 1810 },
  { name: "Oct", revenue: 64000, orders: 1920 },
  { name: "Nov", revenue: 67000, orders: 2050 },
  { name: "Dec", revenue: 72000, orders: 2230 },
];

// Top products by sales
const topProducts = [
  { name: "Wireless Earbuds", sales: 1240, revenue: 37100 },
  { name: "Smart Watch", sales: 890, revenue: 115700 },
  { name: "Yoga Mat", sales: 760, revenue: 22800 },
  { name: "Water Bottle", sales: 650, revenue: 16250 },
  { name: "Coffee Mug", sales: 540, revenue: 10800 },
];

// Recent orders
const recentOrders = [
  {
    id: "ORD-1245",
    customer: "John Smith",
    amount: 156.47,
    status: "Delivered",
    date: "2025-02-22",
  },
  {
    id: "ORD-1246",
    customer: "Emma Wilson",
    amount: 89.99,
    status: "Processing",
    date: "2025-02-22",
  },
  {
    id: "ORD-1247",
    customer: "Michael Brown",
    amount: 234.5,
    status: "Shipped",
    date: "2025-02-21",
  },
  {
    id: "ORD-1248",
    customer: "Sarah Davis",
    amount: 67.3,
    status: "Paid",
    date: "2025-02-21",
  },
  {
    id: "ORD-1249",
    customer: "James Wilson",
    amount: 429.99,
    status: "Pending",
    date: "2025-02-20",
  },
];

// Recent user registrations
const recentUsers = [
  {
    name: "Alice Cooper",
    email: "alice@example.com",
    role: "buyer",
    date: "2025-02-22",
  },
  {
    name: "Bob Marley",
    email: "bob@example.com",
    role: "seller",
    date: "2025-02-22",
  },
  {
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "buyer",
    date: "2025-02-21",
  },
  {
    name: "Diana Prince",
    email: "diana@example.com",
    role: "seller",
    date: "2025-02-21",
  },
];

// Pending seller applications
const pendingSellers = [
  { name: "Tech Gadgets Inc.", owner: "Mike Chen", date: "2025-02-22" },
  { name: "Fashion World", owner: "Lisa Wong", date: "2025-02-21" },
  { name: "Home Essentials", owner: "David Kim", date: "2025-02-20" },
];

// Category distribution for pie chart
const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Fashion", value: 28 },
  { name: "Home & Garden", value: 18 },
  { name: "Sports", value: 12 },
  { name: "Other", value: 7 },
];
const COLORS = ["#FF6600", "#FF8C42", "#FFB26B", "#FFD8A8", "#F5F5F5"];

// Alerts
const alerts = [
  {
    type: "low-stock",
    message: "15 products are running low on stock",
    severity: "high",
  },
  {
    type: "reported",
    message: "3 products have been reported by users",
    severity: "medium",
  },
  { type: "dispute", message: "2 orders are in dispute", severity: "medium" },
  {
    type: "server",
    message: "API response time increased by 15%",
    severity: "low",
  },
];

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState("month");

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-6">Platform overview and management</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <FiDollarSign className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue (MTD)</p>
                <p className="text-xl font-bold">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-green-600">
                  +{stats.revenueTrend}% vs last month
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <FiShoppingBag className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Orders</p>
                <p className="text-xl font-bold">{stats.totalOrders}</p>
                <p className="text-xs text-orange-600">
                  {stats.pendingOrders} pending
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <FiUsers className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-xl font-bold">
                  {stats.activeUsers.toLocaleString()}
                </p>
                <p className="text-xs text-green-600">
                  +{stats.newUsers} this month
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-full">
                <FiBriefcase className="text-yellow-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Sellers</p>
                <p className="text-xl font-bold">{stats.activeSellers}</p>
                <p className="text-xs text-orange-600">
                  {stats.pendingSellers} pending approval
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Revenue & Orders</h2>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="week">Last 7 days</option>
                <option value="month">This month</option>
                <option value="year">This year</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#FF6600" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FF6600" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#FF6600"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders"
                    stroke="#2563eb"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Products Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Recent Orders & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recent Orders Table */}
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <Link
                href="/admin/orders"
                className="text-sm text-[#FF6600] hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left py-2">Order ID</th>
                    <th className="text-left py-2">Customer</th>
                    <th className="text-right py-2">Amount</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100">
                      <td className="py-2 font-mono text-xs">{order.id}</td>
                      <td className="py-2">{order.customer}</td>
                      <td className="py-2 text-right">
                        ${order.amount.toFixed(2)}
                      </td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Processing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "Pending"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-2">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-3">Alerts</h2>
            <div className="space-y-3">
              {alerts.map((alert, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-sm p-2 bg-gray-50 rounded"
                >
                  <FiAlertCircle
                    className={`mt-0.5 ${
                      alert.severity === "high"
                        ? "text-red-500"
                        : alert.severity === "medium"
                          ? "text-orange-500"
                          : "text-blue-500"
                    }`}
                    size={16}
                  />
                  <div className="flex-1">
                    <p className="text-gray-700">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/admin/alerts"
                className="text-sm text-[#FF6600] hover:underline"
              >
                View All
              </Link>
            </div>
          </div>
        </div>

        {/* Seller Approvals Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">
              Pending Seller Applications
            </h2>
            <Link
              href="/admin/sellers?status=pending"
              className="text-sm text-[#FF6600] hover:underline"
            >
              Manage
            </Link>
          </div>
          <div className="space-y-3">
            {pendingSellers.map((seller, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div>
                  <p className="font-medium">{seller.name}</p>
                  <p className="text-xs text-gray-500">
                    Owner: {seller.owner} • Applied: {seller.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                    <FiCheckCircle size={18} />
                  </button>
                  <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                    <FiXCircle size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/admin/products/add"
            className="flex flex-col items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm"
          >
            <FiPackage className="text-[#FF6600]" size={24} />
            <span className="text-xs text-center">Add Product</span>
          </Link>
          <Link
            href="/admin/categories/add"
            className="flex flex-col items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm"
          >
            <FiGrid className="text-[#FF6600]" size={24} />
            <span className="text-xs text-center">Create Category</span>
          </Link>
          <Link
            href="/admin/newsletter"
            className="flex flex-col items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm"
          >
            <FiUsers className="text-[#FF6600]" size={24} />
            <span className="text-xs text-center">Send Newsletter</span>
          </Link>
          <Link
            href="/admin/reports"
            className="flex flex-col items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm"
          >
            <FiBarChart2 className="text-[#FF6600]" size={24} />
            <span className="text-xs text-center">View Reports</span>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
