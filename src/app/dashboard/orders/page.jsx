"use client";
import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiCalendar } from "react-icons/fi";

// Mock orders
const orders = [
  {
    id: "ORD-123456",
    date: "Mar 15, 2025",
    total: 128.77,
    status: "Delivered",
    items: [
      {
        name: "Wireless Earbuds",
        quantity: 2,
        price: 29.99,
        image:
          "https://images.unsplash.com/photo-1606741965583-5c4b0a5e4b0a?w=100",
      },
      {
        name: "Smart Watch",
        quantity: 1,
        price: 49.99,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
      },
    ],
  },
  // ... more
];

const statuses = [
  "All",
  "Pending Payment",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 mb-4 pb-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              activeTab === status
                ? "bg-orange text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order number or product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <button className="ml-2 border px-4 py-2 rounded-lg flex items-center">
          <FiCalendar className="mr-2" /> Filter
        </button>
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border rounded-lg overflow-hidden"
          >
            <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">Order #{order.id}</span>
                <span className="mx-2">·</span>
                <span className="text-sm text-gray-500">{order.date}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-semibold">${order.total.toFixed(2)}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Processing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center py-2 border-b last:border-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-4 flex flex-wrap gap-2 justify-end">
              <Link
                href={`/orders/${order.id}`}
                className="text-orange text-sm hover:underline px-3 py-1"
              >
                View Details
              </Link>
              <Link
                href={`/orders/${order.id}/track`}
                className="text-orange text-sm hover:underline px-3 py-1 border border-orange rounded"
              >
                Track Order
              </Link>
              <button className="text-gray-600 text-sm hover:underline px-3 py-1">
                Contact Seller
              </button>
              <button className="text-gray-600 text-sm hover:underline px-3 py-1">
                Buy Again
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
