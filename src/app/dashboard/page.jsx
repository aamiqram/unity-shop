// app/dashboard/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { FiPackage, FiClock, FiHeart, FiAward } from "react-icons/fi";
import { demoProducts } from "@/lib/demoProducts";

// Mock user data
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://via.placeholder.com/100x100?text=JD",
  memberSince: "January 2024",
  stats: {
    totalOrders: 12,
    pendingOrders: 2,
    wishlistItems: 8,
    rewardPoints: 1250,
  },
};

// Mock recent orders
const recentOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-02-20",
    status: "Delivered",
    total: 156.47,
    items: [
      {
        id: 1,
        title: "Wireless Earbuds",
        image:
          "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=100&auto=format",
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-02-18",
    status: "Shipped",
    total: 89.99,
    items: [
      {
        id: 2,
        title: "Water Bottle",
        image:
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&auto=format",
      },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "2024-02-15",
    status: "Processing",
    total: 45.5,
    items: [
      {
        id: 3,
        title: "Yoga Mat",
        image:
          "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&auto=format",
      },
    ],
  },
];

// Mock wishlist items (first 4 from demoProducts)
const wishlistItems = demoProducts.slice(0, 4);

// Mock notifications
const notifications = [
  {
    id: 1,
    type: "order",
    message: "Order #ORD-2024-001 has been delivered.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "price",
    message: "Price drop on 'Wireless Earbuds' – now $24.99",
    time: "1 day ago",
    read: true,
  },
  {
    id: 3,
    type: "message",
    message: "New message from Shenzhen Tech Co.",
    time: "2 days ago",
    read: false,
  },
];

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <DashboardLayout>
      {/* Welcome section */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {greeting}, {user.name}!
        </h1>
        <p className="text-gray-600">Member since {user.memberSince}</p>
      </div>

      {/* Quick stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <FiPackage className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-xl font-bold">{user.stats.totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-full">
              <FiClock className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-bold">{user.stats.pendingOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <FiHeart className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Wishlist</p>
              <p className="text-xl font-bold">{user.stats.wishlistItems}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <FiAward className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Points</p>
              <p className="text-xl font-bold">{user.stats.rewardPoints}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <Link
            href="/dashboard/orders"
            className="text-sm text-[#FF6600] hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-2">Order</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Status</th>
                <th className="text-right py-2">Total</th>
                <th className="text-right py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      {order.items[0] && (
                        <div className="w-8 h-8 relative">
                          <Image
                            src={order.items[0].image}
                            alt={order.items[0].title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      <span className="font-mono text-xs">{order.id}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">${order.total.toFixed(2)}</td>
                  <td className="py-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <Link
                        href={`/orders/${order.id}/track`}
                        className="text-xs text-[#FF6600] hover:underline"
                      >
                        Track
                      </Link>
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-xs text-gray-500 hover:underline"
                      >
                        Details
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two column layout for wishlist and notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wishlist preview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Your Wishlist</h2>
            <Link
              href="/dashboard/wishlist"
              className="text-sm text-[#FF6600] hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {wishlistItems.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}/${item.slug}`}
                className="group"
              >
                <div className="aspect-square relative bg-gray-100 rounded overflow-hidden mb-1">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-xs truncate">{item.title}</p>
                <p className="text-xs font-semibold text-[#FF6600]">
                  ${item.priceMin}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-semibold mb-3">Notifications</h2>
          <div className="space-y-3">
            {notifications.map((note) => (
              <div
                key={note.id}
                className={`flex items-start gap-2 text-sm p-2 rounded ${
                  !note.read ? "bg-blue-50" : ""
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 ${
                    !note.read ? "bg-[#FF6600]" : "bg-gray-300"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-gray-700">{note.message}</p>
                  <p className="text-xs text-gray-400">{note.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Recommended for You</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {demoProducts.slice(4, 9).map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}/${product.slug}`}
              className="bg-white border border-gray-200 rounded-lg p-2 hover:shadow-md transition"
            >
              <div className="aspect-square relative bg-gray-100 rounded mb-2">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <p className="text-xs truncate">{product.title}</p>
              <p className="text-xs font-semibold">${product.priceMin}</p>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
