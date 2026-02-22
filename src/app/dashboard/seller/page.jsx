// app/dashboard/seller/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SellerLayout from "@/components/seller/SellerLayout";
import {
  FiPackage,
  FiShoppingBag,
  FiAlertCircle,
  FiMessageSquare,
  FiStar,
  FiTrendingUp,
  FiDollarSign,
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
} from "recharts";

// Mock data for stats
const stats = {
  totalSales: 12580.5,
  salesTrend: 12.5, // percentage up
  orders: 342,
  pendingOrders: 8,
  products: 128,
  outOfStock: 3,
  rating: 4.7,
  reviews: 89,
};

// Sales data for chart
const salesData = [
  { name: "Jan", sales: 4000, orders: 120 },
  { name: "Feb", sales: 3000, orders: 98 },
  { name: "Mar", sales: 5000, orders: 150 },
  { name: "Apr", sales: 4500, orders: 135 },
  { name: "May", sales: 6000, orders: 180 },
  { name: "Jun", sales: 5500, orders: 165 },
  { name: "Jul", sales: 7000, orders: 210 },
  { name: "Aug", sales: 8000, orders: 240 },
  { name: "Sep", sales: 7500, orders: 225 },
  { name: "Oct", sales: 8200, orders: 250 },
  { name: "Nov", sales: 9000, orders: 270 },
  { name: "Dec", sales: 10000, orders: 300 },
];

// Recent orders
const recentOrders = [
  {
    id: "ORD-1001",
    customer: "John Smith",
    product: "Wireless Earbuds",
    amount: 45.99,
    status: "Paid",
    date: "2025-02-22",
  },
  {
    id: "ORD-1002",
    customer: "Emma Wilson",
    product: "Yoga Mat",
    amount: 29.5,
    status: "Processing",
    date: "2025-02-22",
  },
  {
    id: "ORD-1003",
    customer: "Michael Brown",
    product: "Bluetooth Speaker",
    amount: 89.99,
    status: "Shipped",
    date: "2025-02-21",
  },
  {
    id: "ORD-1004",
    customer: "Sarah Davis",
    product: "Smart Watch",
    amount: 129.99,
    status: "Paid",
    date: "2025-02-21",
  },
  {
    id: "ORD-1005",
    customer: "James Wilson",
    product: "Coffee Mug Set",
    amount: 34.99,
    status: "Pending",
    date: "2025-02-20",
  },
];

// Top products
const topProducts = [
  {
    id: 1,
    name: "Wireless Earbuds",
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=100&auto=format",
    sales: 342,
    revenue: 15428.58,
    stock: 56,
  },
  {
    id: 2,
    name: "Stainless Steel Water Bottle",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&auto=format",
    sales: 287,
    revenue: 7175.0,
    stock: 23,
  },
  {
    id: 3,
    name: "Fitness Tracker",
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100&auto=format",
    sales: 156,
    revenue: 2496.0,
    stock: 12,
  },
  {
    id: 4,
    name: "Yoga Mat",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&auto=format",
    sales: 142,
    revenue: 2840.0,
    stock: 8,
  },
  {
    id: 5,
    name: "Ceramic Coffee Mug",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&auto=format",
    sales: 98,
    revenue: 980.0,
    stock: 34,
  },
];

// Alerts
const alerts = [
  {
    type: "low-stock",
    message: "Yoga Mat is running low (8 left)",
    severity: "high",
  },
  {
    type: "order",
    message: "You have 8 pending orders to process",
    severity: "medium",
  },
  {
    type: "message",
    message: "3 new messages from customers",
    severity: "low",
  },
  {
    type: "review",
    message: "New 5-star review on Wireless Earbuds",
    severity: "low",
  },
];

export default function SellerDashboardPage() {
  const [timeRange, setTimeRange] = useState("month");

  return (
    <SellerLayout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Seller Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome back! Here's what's happening with your store today.
        </p>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <FiDollarSign className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Sales (MTD)</p>
                <p className="text-xl font-bold">
                  ${stats.totalSales.toLocaleString()}
                </p>
                <p className="text-xs text-green-600">
                  +{stats.salesTrend}% vs last month
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
                <p className="text-xl font-bold">{stats.orders}</p>
                <p className="text-xs text-orange-600">
                  {stats.pendingOrders} pending
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <FiPackage className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Products</p>
                <p className="text-xl font-bold">{stats.products}</p>
                <p className="text-xs text-red-600">
                  {stats.outOfStock} out of stock
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-full">
                <FiStar className="text-yellow-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Store Rating</p>
                <p className="text-xl font-bold">{stats.rating} ★</p>
                <p className="text-xs text-gray-500">{stats.reviews} reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sales chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Sales Overview</h2>
            <div className="flex gap-2">
              {["week", "month", "year"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-xs rounded ${
                    timeRange === range
                      ? "bg-[#FF6600] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {range === "week"
                    ? "Week"
                    : range === "month"
                      ? "Month"
                      : "Year"}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6600" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FF6600" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#FF6600"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recent orders */}
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <Link
                href="/dashboard/seller/orders"
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
                    <th className="text-left py-2">Product</th>
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
                      <td className="py-2">{order.product}</td>
                      <td className="py-2 text-right">
                        ${order.amount.toFixed(2)}
                      </td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "Shipped"
                                  ? "bg-blue-100 text-blue-800"
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

          {/* Alerts and notifications */}
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
                href="/dashboard/seller/alerts"
                className="text-sm text-[#FF6600] hover:underline"
              >
                View All Alerts
              </Link>
            </div>
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Top Selling Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {topProducts.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg p-2"
              >
                <div className="aspect-square relative bg-gray-100 rounded mb-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <p className="text-xs font-medium truncate">{product.name}</p>
                <p className="text-xs text-gray-500">Sold: {product.sales}</p>
                <p className="text-xs text-gray-500">
                  Revenue: ${product.revenue}
                </p>
                <p className="text-xs mt-1">
                  Stock:{" "}
                  <span
                    className={
                      product.stock < 10 ? "text-red-600" : "text-green-600"
                    }
                  >
                    {product.stock}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions and performance metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/dashboard/seller/products/add"
                className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <FiPackage size={24} className="text-[#FF6600]" />
                <span className="text-xs text-center">Add New Product</span>
              </Link>
              <Link
                href="/dashboard/seller/orders"
                className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <FiShoppingBag size={24} className="text-[#FF6600]" />
                <span className="text-xs text-center">Manage Orders</span>
              </Link>
              <Link
                href="/dashboard/seller/analytics"
                className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <FiTrendingUp size={24} className="text-[#FF6600]" />
                <span className="text-xs text-center">View Analytics</span>
              </Link>
              <Link
                href="/dashboard/seller/messages"
                className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <FiMessageSquare size={24} className="text-[#FF6600]" />
                <span className="text-xs text-center">Contact Support</span>
              </Link>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-3">Performance Metrics</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Seller Health Score</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Response Time</span>
                  <span className="font-medium">1.5 hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Order Fulfillment Rate</span>
                  <span className="font-medium">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "98%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Customer Satisfaction</span>
                  <span className="font-medium">4.8/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: "96%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}
