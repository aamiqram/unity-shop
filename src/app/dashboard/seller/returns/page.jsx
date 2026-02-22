// app/dashboard/seller/returns/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SellerLayout from "@/components/seller/SellerLayout";
import { mockReturns } from "@/lib/returnData";
import { FiEye } from "react-icons/fi";

export default function SellerReturnsPage() {
  // For demo, filter returns for seller1 (Shenzhen Tech Co.)
  const sellerReturns = mockReturns.filter((r) => r.sellerId === "seller1");
  const [returns, setReturns] = useState(sellerReturns);

  const pendingCount = returns.filter(
    (r) => r.status === "Return requested",
  ).length;
  const approvedCount = returns.filter((r) => r.status === "Approved").length;
  const shippedCount = returns.filter(
    (r) => r.status === "Item shipped back",
  ).length;

  return (
    <SellerLayout>
      <div>
        <h1 className="text-2xl font-bold mb-2">Return Requests</h1>
        <p className="text-gray-600 mb-6">Manage customer returns</p>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-xl font-bold text-orange-600">{pendingCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Approved</p>
            <p className="text-xl font-bold text-blue-600">{approvedCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Shipped Back</p>
            <p className="text-xl font-bold text-green-600">{shippedCount}</p>
          </div>
        </div>

        {/* Returns table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-3 text-left">Return ID</th>
                <th className="p-3 text-left">Order</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Buyer</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Request Date</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {returns.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-3 font-mono text-xs">{r.id}</td>
                  <td className="p-3 font-mono text-xs">{r.orderId}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 relative">
                        <Image
                          src={r.productImage}
                          alt={r.productName}
                          width={32}
                          height={32}
                          className="rounded"
                        />
                      </div>
                      <span className="truncate max-w-[150px]">
                        {r.productName}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">{r.buyerName}</td>
                  <td className="p-3 capitalize">{r.reason}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(r.requestDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/dashboard/seller/returns/${r.id}`}
                      className="text-gray-500 hover:text-[#FF6600]"
                    >
                      <FiEye size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SellerLayout>
  );
}
