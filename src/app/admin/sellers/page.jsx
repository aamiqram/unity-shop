"use client";
import { useState } from "react";
import { FiSearch, FiCheckCircle, FiXCircle } from "react-icons/fi";

const sellers = [
  {
    id: 1,
    store: "TechCorp",
    owner: "John Doe",
    email: "john@techcorp.com",
    products: 45,
    sales: "$23k",
    health: 92,
    status: "Active",
  },
  {
    id: 2,
    store: "Fashion Hub",
    owner: "Jane Smith",
    email: "jane@fashion.com",
    products: 28,
    sales: "$12k",
    health: 78,
    status: "Pending",
  },
];

export default function AdminSellersPage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Seller Management</h1>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-full ${filter === "all" ? "bg-orange text-white" : "bg-gray-100"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-3 py-1 rounded-full ${filter === "pending" ? "bg-orange text-white" : "bg-gray-100"}`}
        >
          Pending Approval
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded-full ${filter === "active" ? "bg-orange text-white" : "bg-gray-100"}`}
        >
          Active
        </button>
      </div>

      <table className="w-full bg-white rounded-lg border">
        <thead>
          <tr className="bg-gray-50">
            <th>Store</th>
            <th>Owner</th>
            <th>Products</th>
            <th>Sales</th>
            <th>Health</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{s.store}</td>
              <td className="p-2">{s.owner}</td>
              <td className="p-2">{s.products}</td>
              <td className="p-2">{s.sales}</td>
              <td className="p-2">
                <div className="w-16 bg-gray-200 h-2 rounded">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{ width: `${s.health}%` }}
                  ></div>
                </div>
              </td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${s.status === "Active" ? "bg-green-100" : "bg-yellow-100"}`}
                >
                  {s.status}
                </span>
              </td>
              <td className="p-2">
                {s.status === "Pending" && (
                  <>
                    <button className="text-green-600 mr-2">
                      <FiCheckCircle />
                    </button>
                    <button className="text-red-600">
                      <FiXCircle />
                    </button>
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
