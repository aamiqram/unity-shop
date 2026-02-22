// app/dashboard/orders/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { FiSearch, FiCalendar, FiChevronDown } from "react-icons/fi";

// Mock orders data (extended)
const allOrders = [
  {
    id: "ORD-2024-001234",
    date: "2025-02-20",
    total: 156.47,
    status: "Delivered",
    paymentStatus: "Paid",
    seller: "Shenzhen Tech Co., Ltd.",
    items: [
      {
        id: 1,
        title: "Wireless Bluetooth Earbuds",
        image:
          "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=100&auto=format",
        quantity: 2,
        price: 29.99,
        variant: "Black",
      },
      {
        id: 2,
        title: "Stainless Steel Water Bottle",
        image:
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&auto=format",
        quantity: 1,
        price: 19.99,
        variant: "500ml",
      },
    ],
    canCancel: false,
    canReturn: false,
    tracking: "1Z999AA10123456784",
  },
  {
    id: "ORD-2024-001235",
    date: "2025-02-18",
    total: 89.99,
    status: "Shipped",
    paymentStatus: "Paid",
    seller: "Guangzhou Fashion Ltd.",
    items: [
      {
        id: 3,
        title: "Men's Casual T-Shirt",
        image:
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100&auto=format",
        quantity: 2,
        price: 24.99,
        variant: "Large, Blue",
      },
    ],
    canCancel: true,
    canReturn: false,
    tracking: "1Z999BB20234567890",
  },
  {
    id: "ORD-2024-001236",
    date: "2025-02-15",
    total: 45.5,
    status: "Processing",
    paymentStatus: "Paid",
    seller: "Yiwu Houseware Co.",
    items: [
      {
        id: 4,
        title: "Ceramic Coffee Mug Set",
        image:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&auto=format",
        quantity: 2,
        price: 12.75,
        variant: "Set of 6",
      },
    ],
    canCancel: true,
    canReturn: false,
  },
  {
    id: "ORD-2024-001237",
    date: "2025-02-10",
    total: 320.0,
    status: "Pending Payment",
    paymentStatus: "Unpaid",
    seller: "Shenzhen Electronics Ltd.",
    items: [
      {
        id: 5,
        title: "Smart LED TV 32-inch",
        image:
          "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=100&auto=format",
        quantity: 1,
        price: 320.0,
        variant: "HD Ready",
      },
    ],
    canCancel: true,
    canReturn: false,
  },
  {
    id: "ORD-2024-001238",
    date: "2025-02-05",
    total: 67.3,
    status: "Cancelled",
    paymentStatus: "Refunded",
    seller: "Ningbo Sportswear",
    items: [
      {
        id: 6,
        title: "Women's Yoga Pants",
        image:
          "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=100&auto=format",
        quantity: 1,
        price: 35.99,
        variant: "Medium, Black",
      },
      {
        id: 7,
        title: "Yoga Mat",
        image:
          "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&auto=format",
        quantity: 1,
        price: 31.31,
        variant: "Purple",
      },
    ],
    canCancel: false,
    canReturn: false,
  },
  {
    id: "ORD-2024-001239",
    date: "2025-02-01",
    total: 28.5,
    status: "Delivered",
    paymentStatus: "Paid",
    seller: "Chaozhou Ceramics",
    items: [
      {
        id: 8,
        title: "Ceramic Flower Vase",
        image:
          "https://images.unsplash.com/photo-1584583570840-0a3d88497593?w=100&auto=format",
        quantity: 1,
        price: 28.5,
        variant: "Set of 3",
      },
    ],
    canCancel: false,
    canReturn: true, // within return window
  },
];

const statusTabs = [
  { id: "all", label: "All Orders" },
  { id: "pending", label: "Pending Payment" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
  { id: "returns", label: "Returns/Refunds" },
];

const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "oldest", label: "Oldest" },
  { value: "high-low", label: "Price High-Low" },
  { value: "low-high", label: "Price Low-High" },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Filter orders based on active tab and search
  const filteredOrders = allOrders.filter((order) => {
    // Tab filter
    if (activeTab !== "all") {
      const statusMap = {
        pending: "Pending Payment",
        processing: "Processing",
        shipped: "Shipped",
        delivered: "Delivered",
        cancelled: "Cancelled",
        returns: "Returns/Refunds", // we might have a separate status for returns
      };
      if (order.status !== statusMap[activeTab]) return false;
    }

    // Search filter (order ID or product title)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesOrderId = order.id.toLowerCase().includes(q);
      const matchesProduct = order.items.some((item) =>
        item.title.toLowerCase().includes(q),
      );
      if (!matchesOrderId && !matchesProduct) return false;
    }

    // Date range filter (simplified, not implemented fully)
    // ...

    return true;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "high-low":
        return b.total - a.total;
      case "low-high":
        return a.total - b.total;
      default: // recent
        return new Date(b.date) - new Date(a.date);
    }
  });

  const getStatusBadge = (status) => {
    const colors = {
      Delivered: "bg-green-100 text-green-800",
      Shipped: "bg-blue-100 text-blue-800",
      Processing: "bg-yellow-100 text-yellow-800",
      "Pending Payment": "bg-orange-100 text-orange-800",
      Cancelled: "bg-red-100 text-red-800",
      "Returns/Refunds": "bg-purple-100 text-purple-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-gray-600 mb-6">Manage and track your orders</p>

        {/* Search and filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by order number or product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <FiCalendar size={16} />
                <span>Date</span>
                <FiChevronDown size={14} />
              </button>
              {showDatePicker && (
                <div className="absolute right-0 mt-2 p-3 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={dateRange.from}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, from: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                    <span className="self-center">to</span>
                    <input
                      type="date"
                      value={dateRange.to}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, to: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex overflow-x-auto pb-2 mb-4 space-x-1">
          {statusTabs.map((tab) => {
            const count = allOrders.filter(
              (o) =>
                tab.id === "all"
                  ? true
                  : o.status === tab.label ||
                    (tab.id === "returns" &&
                      o.status === "Delivered" &&
                      o.canReturn), // simplified
            ).length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#FF6600] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}{" "}
                {count > 0 && <span className="ml-1 text-xs">({count})</span>}
              </button>
            );
          })}
        </div>

        {/* Orders list */}
        {sortedOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                {/* Order header */}
                <div className="bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between gap-2 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Order Number</p>
                      <p className="font-mono font-medium text-sm">
                        {order.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Order Date</p>
                      <p className="text-sm">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}
                    >
                      {order.status}
                    </span>
                    <span className="text-sm font-semibold">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Seller info */}
                <div className="px-4 py-2 border-b border-gray-100 bg-white">
                  <p className="text-xs text-gray-500">Seller</p>
                  <p className="text-sm font-medium">{order.seller}</p>
                </div>

                {/* Items */}
                <div className="px-4 py-2">
                  {order.items.map((item) => (
                    <div
                      key={`${order.id}-${item.id}`}
                      className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0"
                    >
                      <div className="w-12 h-12 relative flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-gray-500">
                          {item.variant} • Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer actions */}
                <div className="bg-gray-50 px-4 py-3 flex flex-wrap gap-2 justify-end">
                  {order.status === "Shipped" && order.tracking && (
                    <Link
                      href={`/orders/${order.id}/track`}
                      className="text-sm text-[#FF6600] hover:underline px-3 py-1"
                    >
                      Track Order
                    </Link>
                  )}
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-sm text-gray-600 hover:text-[#FF6600] px-3 py-1"
                  >
                    View Details
                  </Link>
                  <button className="text-sm text-gray-600 hover:text-[#FF6600] px-3 py-1">
                    Contact Seller
                  </button>
                  {order.status === "Delivered" && (
                    <button className="text-sm text-gray-600 hover:text-[#FF6600] px-3 py-1">
                      Write Review
                    </button>
                  )}
                  {order.canCancel && (
                    <button className="text-sm text-red-600 hover:text-red-800 px-3 py-1">
                      Cancel Order
                    </button>
                  )}
                  {order.canReturn && (
                    <button className="text-sm text-[#FF6600] hover:underline px-3 py-1">
                      Return/Refund
                    </button>
                  )}
                  <Link
                    href={`/orders/${order.id}/invoice`}
                    className="text-sm text-gray-600 hover:text-[#FF6600] px-3 py-1"
                  >
                    Invoice
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination (optional) */}
        {sortedOrders.length > 0 && (
          <div className="flex justify-center mt-6">
            <nav className="flex gap-1">
              <button className="w-8 h-8 border border-gray-300 rounded-md disabled:opacity-50">
                Prev
              </button>
              <button className="w-8 h-8 bg-[#FF6600] text-white rounded-md">
                1
              </button>
              <button className="w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50">
                2
              </button>
              <button className="w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50">
                3
              </button>
              <button className="w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
