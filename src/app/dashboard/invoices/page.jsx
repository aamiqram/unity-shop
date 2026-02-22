// app/dashboard/invoices/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockInvoices, formatCurrency } from "@/lib/invoiceData";
import { FiSearch, FiDownload, FiEye } from "react-icons/fi";

export default function BuyerInvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter invoices by current buyer (mock: assume buyer email is john.smith@example.com)
  const buyerInvoices = mockInvoices.filter(
    (inv) => inv.buyer.email === "john.smith@example.com",
  );

  const filteredInvoices = buyerInvoices.filter((inv) => {
    const matchesSearch =
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-2">My Invoices</h1>
        <p className="text-gray-600 mb-6">View and download your invoices</p>

        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by invoice number or seller"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Invoices table */}
        {filteredInvoices.length === 0 ? (
          <div className="bg-white p-8 text-center border border-gray-200 rounded-lg">
            <p className="text-gray-500">No invoices found.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-3 text-left">Invoice #</th>
                  <th className="p-3 text-left">Order #</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Seller</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-3 font-mono text-xs">{inv.id}</td>
                    <td className="p-3 font-mono text-xs">{inv.orderId}</td>
                    <td className="p-3">{inv.orderDate}</td>
                    <td className="p-3">{inv.seller.name}</td>
                    <td className="p-3 text-right font-medium">
                      {formatCurrency(inv.total)}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          inv.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/dashboard/invoices/${inv.id}`}
                          className="text-gray-500 hover:text-[#FF6600]"
                        >
                          <FiEye size={16} />
                        </Link>
                        <button className="text-gray-500 hover:text-[#FF6600]">
                          <FiDownload size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
