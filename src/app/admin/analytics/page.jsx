// app/admin/analytics/page.jsx
"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
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
import { FiDownload, FiCalendar } from "react-icons/fi";

// Mock platform-wide data
const platformRevenueData = [
  { month: "Jan", revenue: 125000, orders: 4200, sellers: 180 },
  { month: "Feb", revenue: 132000, orders: 4400, sellers: 185 },
  { month: "Mar", revenue: 141000, orders: 4700, sellers: 192 },
  { month: "Apr", revenue: 148000, orders: 4900, sellers: 198 },
  { month: "May", revenue: 155000, orders: 5100, sellers: 205 },
  { month: "Jun", revenue: 162000, orders: 5300, sellers: 212 },
  { month: "Jul", revenue: 170000, orders: 5500, sellers: 220 },
  { month: "Aug", revenue: 179000, orders: 5800, sellers: 228 },
  { month: "Sep", revenue: 187000, orders: 6000, sellers: 235 },
  { month: "Oct", revenue: 196000, orders: 6300, sellers: 242 },
  { month: "Nov", revenue: 210000, orders: 6700, sellers: 250 },
  { month: "Dec", revenue: 230000, orders: 7200, sellers: 260 },
];

const topSellers = [
  { name: "Shenzhen Tech Co.", revenue: 125000, orders: 1250, rating: 4.8 },
  { name: "Guangzhou Fashion Ltd.", revenue: 98000, orders: 980, rating: 4.6 },
  { name: "Yiwu Houseware Co.", revenue: 76000, orders: 760, rating: 4.5 },
  { name: "Ningbo Sportswear", revenue: 54000, orders: 540, rating: 4.7 },
  { name: "Chaozhou Ceramics", revenue: 43000, orders: 430, rating: 4.9 },
];

const categoryBreakdown = [
  { category: "Electronics", revenue: 320000, orders: 8500 },
  { category: "Fashion", revenue: 210000, orders: 7200 },
  { category: "Home & Garden", revenue: 145000, orders: 4900 },
  { category: "Sports", revenue: 98000, orders: 3200 },
  { category: "Other", revenue: 67000, orders: 2200 },
];

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year");

  const totalGMV = platformRevenueData.reduce((acc, d) => acc + d.revenue, 0);
  const totalOrders = platformRevenueData.reduce((acc, d) => acc + d.orders, 0);
  const totalSellers =
    platformRevenueData[platformRevenueData.length - 1].sellers;
  const avgOrderValue = totalGMV / totalOrders;

  return (
    <AdminLayout>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Platform Analytics</h1>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="year">This Year</option>
              <option value="quarter">Last 3 Months</option>
              <option value="month">This Month</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
              <FiCalendar size={16} />
              Jan 1 - Dec 31, 2025
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
              <FiDownload size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Overview metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">GMV</p>
            <p className="text-2xl font-bold">
              ${(totalGMV / 1000000).toFixed(1)}M
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Orders</p>
            <p className="text-2xl font-bold">{totalOrders.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Active Sellers</p>
            <p className="text-2xl font-bold">{totalSellers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Avg Order Value</p>
            <p className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</p>
          </div>
        </div>

        {/* Revenue chart */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Platform Revenue & Orders
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={platformRevenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6600" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FF6600" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip
                  formatter={(value, name) => [
                    value,
                    name === "revenue" ? "Revenue ($)" : "Orders",
                  ]}
                />
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

        {/* Two column: Top sellers & Category breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Top Sellers</h2>
            <div className="space-y-3">
              {topSellers.map((seller, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{seller.name}</p>
                    <p className="text-xs text-gray-500">
                      ★ {seller.rating} · {seller.orders} orders
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${seller.revenue.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Category Performance</h2>
            <div className="space-y-3">
              {categoryBreakdown.map((cat) => (
                <div key={cat.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{cat.category}</span>
                    <span className="font-medium">
                      ${cat.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#FF6600] h-2 rounded-full"
                      style={{ width: `${(cat.revenue / totalGMV) * 100}%` }}
                    />
                  </div>
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
              <p className="text-xs text-gray-500">
                Platform Revenue (Commissions)
              </p>
              <p className="text-lg font-bold">
                ${(totalGMV * 0.08).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Payment Processing Fees</p>
              <p className="text-lg font-bold">
                ${(totalGMV * 0.029 + totalOrders * 0.3).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Net Platform Revenue</p>
              <p className="text-lg font-bold text-green-600">
                $
                {(
                  totalGMV * 0.08 -
                  (totalGMV * 0.029 + totalOrders * 0.3)
                ).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending Payouts</p>
              <p className="text-lg font-bold">$156,000</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              Download Full Report
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
