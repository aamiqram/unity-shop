"use client";
import { useState } from "react";

const orders = [
  {
    id: "ORD-123",
    customer: "John Doe",
    date: "2025-03-15",
    total: 128.77,
    status: "Processing",
    payment: "Paid",
  },
  {
    id: "ORD-124",
    customer: "Jane Smith",
    date: "2025-03-14",
    total: 89.5,
    status: "Shipped",
    payment: "Paid",
  },
];

export default function SellerOrdersPage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-3 rounded border">
          <span className="text-sm">New Orders</span>
          <p className="text-xl font-bold">12</p>
        </div>
        <div className="bg-white p-3 rounded border">
          <span className="text-sm">Processing</span>
          <p className="text-xl font-bold">8</p>
        </div>
        <div className="bg-white p-3 rounded border">
          <span className="text-sm">Shipped</span>
          <p className="text-xl font-bold">15</p>
        </div>
        <div className="bg-white p-3 rounded border">
          <span className="text-sm">Delivered</span>
          <p className="text-xl font-bold">42</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-4">
        {["All", "Pending", "Processing", "Shipped", "Delivered"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded-full text-sm ${filter === s ? "bg-orange text-white" : "bg-gray-100"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Orders table */}
      <table className="w-full bg-white rounded-lg border">
        <thead>
          <tr className="bg-gray-50">
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-2">{o.id}</td>
              <td className="p-2">{o.customer}</td>
              <td className="p-2">{o.date}</td>
              <td className="p-2">${o.total}</td>
              <td className="p-2">
                <span className="bg-green-100 px-2 py-1 rounded">
                  {o.payment}
                </span>
              </td>
              <td className="p-2">
                <span className="bg-yellow-100 px-2 py-1 rounded">
                  {o.status}
                </span>
              </td>
              <td className="p-2">
                <button className="text-orange">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
