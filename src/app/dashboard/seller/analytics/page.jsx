// app/dashboard/seller/analytics/page.jsx
"use client";

import { useState } from "react";
import SellerLayout from "@/components/seller/SellerLayout";
import {
  FiCalendar,
  FiDownload,
  FiTrendingUp,
  FiTrendingDown,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for seller analytics
const salesData = [
  { date: "2025-02-01", sales: 1200, orders: 24 },
  { date: "2025-02-02", sales: 1350, orders: 27 },
  { date: "2025-02-03", sales: 1100, orders: 22 },
  { date: "2025-02-04", sales: 1480, orders: 29 },
  { date: "2025-02-05", sales: 1700, orders: 34 },
  { date: "2025-02-06", sales: 1620, orders: 32 },
  { date: "2025-02-07", sales: 1900, orders: 38 },
  { date: "2025-02-08", sales: 2100, orders: 42 },
  { date: "2025-02-09", sales: 1850, orders: 37 },
  { date: "2025-02-10", sales: 2000, orders: 40 },
  { date: "2025-02-11", sales: 2250, orders: 45 },
  { date: "2025-02-12", sales: 2400, orders: 48 },
  { date: "2025-02-13", sales: 2350, orders: 47 },
  { date: "2025-02-14", sales: 2600, orders: 52 },
  { date: "2025-02-15", sales: 2800, orders: 56 },
  { date: "2025-02-16", sales: 2700, orders: 54 },
  { date: "2025-02-17", sales: 2950, orders: 59 },
  { date: "2025-02-18", sales: 3100, orders: 62 },
  { date: "2025-02-19", sales: 3250, orders: 65 },
  { date: "2025-02-20", sales: 3400, orders: 68 },
  { date: "2025-02-21", sales: 3550, orders: 71 },
  { date: "2025-02-22", sales: 3700, orders: 74 },
  { date: "2025-02-23", sales: 3850, orders: 77 },
  { date: "2025-02-24", sales: 4000, orders: 80 },
  { date: "2025-02-25", sales: 3900, orders: 78 },
  { date: "2025-02-26", sales: 4100, orders: 82 },
  { date: "2025-02-27", sales: 4200, orders: 84 },
  { date: "2025-02-28", sales: 4300, orders: 86 },
];

const categorySales = [
  { name: "Electronics", value: 12500 },
  { name: "Audio", value: 8200 },
  { name: "Wearables", value: 5400 },
  { name: "Accessories", value: 3900 },
];

const paymentMethods = [
  { name: "Credit Card", value: 15600 },
  { name: "PayPal", value: 8900 },
  { name: "Bank Transfer", value: 4500 },
  { name: "Cash on Delivery", value: 1000 },
];

const COLORS = ["#FF6600", "#FF8C42", "#FFB26B", "#FFD8A8"];

const topProducts = [
  {
    name: "Wireless Earbuds",
    sales: 542,
    revenue: 16250,
    views: 12340,
    conversion: 4.4,
  },
  {
    name: "Smart Watch",
    sales: 389,
    revenue: 50570,
    views: 9870,
    conversion: 3.9,
  },
  {
    name: "Bluetooth Speaker",
    sales: 276,
    revenue: 4416,
    views: 7650,
    conversion: 3.6,
  },
  {
    name: "Power Bank",
    sales: 201,
    revenue: 2412,
    views: 5430,
    conversion: 3.7,
  },
  {
    name: "Phone Case",
    sales: 178,
    revenue: 890,
    views: 4210,
    conversion: 4.2,
  },
];

const trafficSources = [
  { source: "Direct", visits: 3450 },
  { source: "Search", visits: 5670 },
  { source: "Social", visits: 2340 },
  { source: "Referral", visits: 1230 },
  { source: "Email", visits: 890 },
];

export default function SellerAnalyticsPage() {
  const [dateRange, setDateRange] = useState("30days"); // today, 7days, 30days, 3months, year, custom
  const [comparison, setComparison] = useState("previous");

  // Summary metrics
  const totalRevenue = salesData.reduce((acc, d) => acc + d.sales, 0);
  const totalOrders = salesData.reduce((acc, d) => acc + d.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const conversionRate = 3.8; // mock

  const prevRevenue = totalRevenue * 0.85; // mock previous period
  const revenueChange = ((totalRevenue - prevRevenue) / prevRevenue) * 100;

  const formatCurrency = (value) => `$${value.toFixed(2)}`;

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header with date range selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Analytics</h1>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="today">Today</option>
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="3months">Last 3 months</option>
              <option value="year">Last year</option>
              <option value="custom">Custom</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
              <FiCalendar size={16} />
              {dateRange === "30days" ? "Feb 1 - Feb 28, 2025" : "Select"}
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
              <FiDownload size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Key metrics cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Revenue</p>
              <FiDollarSign className="text-[#FF6600]" size={20} />
            </div>
            <p className="text-2xl font-bold mt-1">
              ${totalRevenue.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-sm mt-1">
              {revenueChange >= 0 ? (
                <FiTrendingUp className="text-green-500" size={14} />
              ) : (
                <FiTrendingDown className="text-red-500" size={14} />
              )}
              <span
                className={
                  revenueChange >= 0 ? "text-green-600" : "text-red-600"
                }
              >
                {Math.abs(revenueChange).toFixed(1)}%
              </span>
              <span className="text-gray-400 text-xs">vs previous period</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Orders</p>
              <FiShoppingBag className="text-[#FF6600]" size={20} />
            </div>
            <p className="text-2xl font-bold mt-1">{totalOrders}</p>
            <p className="text-sm text-gray-500 mt-1">
              Avg order: ${avgOrderValue.toFixed(2)}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <FiTrendingUp className="text-[#FF6600]" size={20} />
            </div>
            <p className="text-2xl font-bold mt-1">{conversionRate}%</p>
            <p className="text-sm text-gray-500 mt-1">Store visits: 12.4k</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Top Product</p>
              <FiPackage className="text-[#FF6600]" size={20} />
            </div>
            <p className="font-bold mt-1 truncate">{topProducts[0].name}</p>
            <p className="text-sm text-gray-500 mt-1">
              {topProducts[0].sales} units sold
            </p>
          </div>
        </div>

        {/* Sales chart */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6600" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FF6600" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  stroke="#FF6600"
                  fillOpacity={1}
                  fill="url(#colorSales)"
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

        {/* Two column charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales by category */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySales}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categorySales.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment methods */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentMethods} layout="vertical">
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Bar dataKey="value" fill="#FF6600" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top products table */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">
            Top Performing Products
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-right">Units Sold</th>
                  <th className="p-3 text-right">Revenue</th>
                  <th className="p-3 text-right">Views</th>
                  <th className="p-3 text-right">Conversion Rate</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3 text-right">{p.sales}</td>
                    <td className="p-3 text-right">${p.revenue.toFixed(2)}</td>
                    <td className="p-3 text-right">
                      {p.views.toLocaleString()}
                    </td>
                    <td className="p-3 text-right">{p.conversion}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer insights and traffic sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Customer Insights</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">New vs Returning</span>
                <span className="text-sm font-medium">42% / 58%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#FF6600] h-2 rounded-full"
                  style={{ width: "42%" }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Repeat purchase rate</span>
                <span className="font-medium">34%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Average customer lifetime value</span>
                <span className="font-medium">$245</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
            <div className="space-y-2">
              {trafficSources.map((source) => (
                <div key={source.source} className="flex items-center gap-2">
                  <span className="text-sm w-20">{source.source}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#FF6600] h-2 rounded-full"
                      style={{ width: `${(source.visits / 10000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm w-16 text-right">
                    {source.visits.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Financial summary */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Financial Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Gross Revenue</p>
              <p className="text-lg font-bold">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Platform Commission (8%)</p>
              <p className="text-lg font-bold">
                ${(totalRevenue * 0.08).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">
                Payment Fees (2.9% + $0.30/order)
              </p>
              <p className="text-lg font-bold">
                ${(totalRevenue * 0.029 + totalOrders * 0.3).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Net Revenue</p>
              <p className="text-lg font-bold text-green-600">
                $
                {(
                  totalRevenue * 0.92 -
                  totalRevenue * 0.029 -
                  totalOrders * 0.3
                ).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              Download PDF Report
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              Export CSV
            </button>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}
