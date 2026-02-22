// app/admin/returns/page.jsx
"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockReturns } from "@/lib/returnData";
import { FiSearch, FiEye } from "react-icons/fi";

export default function AdminReturnsPage() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(mockReturns);

  const stats = {
    total: mockReturns.length,
    pending: mockReturns.filter((r) => r.status === "Return requested").length,
    approved: mockReturns.filter((r) => r.status === "Approved").length,
    refunded: mockReturns.filter((r) => r.status === "Refund processed").length,
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-2">Returns & Refunds</h1>
        <p className="text-gray-600 mb-6">Manage all return requests</p>

        {/* Stats cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-3 rounded border border-gray-200">
            <p className="text-xs text-gray-500">Total Returns</p>
            <p className="text-xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200">
            <p className="text-xs text-gray-500">Pending</p>
            <p className="text-xl font-bold text-orange-600">{stats.pending}</p>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200">
            <p className="text-xs text-gray-500">Approved</p>
            <p className="text-xl font-bold text-blue-600">{stats.approved}</p>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200">
            <p className="text-xs text-gray-500">Refunded</p>
            <p className="text-xl font-bold text-green-600">{stats.refunded}</p>
          </div>
        </div>

        {/* Search and filter */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by ID, buyer, seller"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <select className="border border-gray-300 rounded px-3 py-2">
            <option>All Status</option>
            <option>Return requested</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Refund processed</option>
          </select>
        </div>

        {/* Returns table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-3 text-left">Return ID</th>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Buyer</th>
                <th className="p-3 text-left">Seller</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockReturns.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-3 font-mono text-xs">{r.id}</td>
                  <td className="p-3 font-mono text-xs">{r.orderId}</td>
                  <td className="p-3">{r.buyerName}</td>
                  <td className="p-3">{r.sellerName}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={r.productImage}
                        alt={r.productName}
                        className="w-6 h-6 object-cover rounded"
                      />
                      <span className="truncate max-w-[100px]">
                        {r.productName}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 capitalize">{r.reason}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <a
                      href={`/admin/returns/${r.id}`}
                      className="text-gray-500 hover:text-[#FF6600]"
                    >
                      <FiEye size={16} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
