"use client";
import { useState } from "react";

const returns = [
  {
    id: "RET-001",
    order: "ORD-123456",
    customer: "John Doe",
    reason: "Damaged",
    status: "Pending",
    date: "2025-03-18",
  },
  {
    id: "RET-002",
    order: "ORD-123457",
    customer: "Jane Smith",
    reason: "Wrong item",
    status: "Approved",
    date: "2025-03-17",
  },
];

export default function SellerReturnsPage() {
  const [filter, setFilter] = useState("pending");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Return Requests</h1>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setFilter("pending")}
          className={`px-3 py-1 rounded-full ${filter === "pending" ? "bg-orange text-white" : "bg-gray-100"}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`px-3 py-1 rounded-full ${filter === "approved" ? "bg-orange text-white" : "bg-gray-100"}`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded-full ${filter === "completed" ? "bg-orange text-white" : "bg-gray-100"}`}
        >
          Completed
        </button>
      </div>

      <table className="w-full bg-white rounded-lg border">
        <thead>
          <tr className="bg-gray-50">
            <th>Return ID</th>
            <th>Order</th>
            <th>Customer</th>
            <th>Reason</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {returns.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="p-2">{r.id}</td>
              <td className="p-2">{r.order}</td>
              <td className="p-2">{r.customer}</td>
              <td className="p-2">{r.reason}</td>
              <td className="p-2">{r.date}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${r.status === "Pending" ? "bg-yellow-100" : r.status === "Approved" ? "bg-green-100" : "bg-gray-100"}`}
                >
                  {r.status}
                </span>
              </td>
              <td className="p-2">
                {r.status === "Pending" && (
                  <>
                    <button className="text-green-600 mr-2">Approve</button>
                    <button className="text-red-600">Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
