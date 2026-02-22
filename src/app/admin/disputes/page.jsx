// app/admin/disputes/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockDisputes, disputeStatuses } from "@/lib/disputeData";
import {
  FiSearch,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState(mockDisputes);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [resolutionDecision, setResolutionDecision] = useState("");

  const filteredDisputes = disputes.filter((d) => {
    const matchesSearch =
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Open":
      case "Awaiting Seller Response":
        return "bg-yellow-100 text-yellow-800";
      case "Under Review":
        return "bg-blue-100 text-blue-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const resolveDispute = (disputeId, decision) => {
    // In real app, call API
    console.log("Resolve dispute", disputeId, decision);
    setShowDetailModal(false);
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-2">Dispute Resolution Center</h1>
        <p className="text-gray-600 mb-6">Manage buyer-seller disputes</p>

        {/* Stats cards (optional) */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-3 rounded border border-gray-200">
            <p className="text-xs text-gray-500">Total Disputes</p>
            <p className="text-xl font-bold">{disputes.length}</p>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200">
            <p className="text-xs text-gray-500">Open</p>
            <p className="text-xl font-bold">
              {disputes.filter((d) => d.status === "Open").length}
            </p>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200">
            <p className="text-xs text-gray-500">Under Review</p>
            <p className="text-xl font-bold">
              {disputes.filter((d) => d.status === "Under Review").length}
            </p>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200">
            <p className="text-xs text-gray-500">Resolved</p>
            <p className="text-xl font-bold">
              {disputes.filter((d) => d.status === "Resolved").length}
            </p>
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
              placeholder="Search by dispute ID, buyer, seller..."
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
            <option value="Open">Open</option>
            <option value="Awaiting Seller Response">Awaiting Seller</option>
            <option value="Under Review">Under Review</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Disputes table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Buyer</th>
                <th className="p-3 text-left">Seller</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Opened</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDisputes.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-3 font-mono text-xs">{d.id}</td>
                  <td className="p-3">{d.buyerName}</td>
                  <td className="p-3">{d.sellerName}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 relative">
                        <Image
                          src={d.productImage}
                          alt={d.productName}
                          width={32}
                          height={32}
                          className="rounded"
                        />
                      </div>
                      <span className="truncate max-w-[150px]">
                        {d.productName}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">{d.reason}</td>
                  <td className="p-3">${d.amount.toFixed(2)}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(d.status)}`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(d.openedAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => {
                        setSelectedDispute(d);
                        setShowDetailModal(true);
                      }}
                      className="text-gray-500 hover:text-[#FF6600]"
                    >
                      <FiEye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail modal */}
        {showDetailModal && selectedDispute && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setShowDetailModal(false)}
          >
            <div
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  Dispute Details - {selectedDispute.id}
                </h2>
                <button onClick={() => setShowDetailModal(false)}>
                  <FiX size={20} />
                </button>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Buyer</p>
                    <p className="font-medium">{selectedDispute.buyerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Seller</p>
                    <p className="font-medium">{selectedDispute.sellerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-mono text-xs">
                      {selectedDispute.orderId}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Order Date</p>
                    <p>{selectedDispute.orderDate}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Product</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Image
                      src={selectedDispute.productImage}
                      alt={selectedDispute.productName}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <span className="font-medium">
                      {selectedDispute.productName}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Dispute Reason</p>
                  <p className="text-sm">{selectedDispute.reason}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Buyer's Description</p>
                  <p className="text-sm bg-gray-50 p-2 rounded">
                    {selectedDispute.description}
                  </p>
                </div>

                {selectedDispute.evidence.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500">Evidence</p>
                    <div className="flex gap-2 mt-1">
                      {selectedDispute.evidence.map((file, idx) => (
                        <a
                          key={idx}
                          href={file.url}
                          className="text-xs text-[#FF6600] hover:underline"
                          target="_blank"
                          rel="noopener"
                        >
                          {file.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-xs text-gray-500">Timeline</p>
                  <div className="space-y-2 mt-1">
                    {selectedDispute.timeline.map((event, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <span className="text-gray-400 w-20">
                          {new Date(event.at).toLocaleDateString()}
                        </span>
                        <span className="font-medium">{event.by}:</span>
                        <span className="text-gray-600">{event.note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Messages</p>
                  {selectedDispute.messages.length > 0 ? (
                    <div className="space-y-2 mt-1">
                      {selectedDispute.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className="bg-gray-50 p-2 rounded text-xs"
                        >
                          <span className="font-medium">{msg.from}:</span>{" "}
                          {msg.text}
                          <span className="text-gray-400 ml-2">
                            {new Date(msg.timestamp).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No messages</p>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <label className="block text-sm font-medium mb-1">
                    Admin Note
                  </label>
                  <textarea
                    rows="2"
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-3"
                    placeholder="Add private note..."
                  />
                  <label className="block text-sm font-medium mb-1">
                    Resolution Decision
                  </label>
                  <select
                    value={resolutionDecision}
                    onChange={(e) => setResolutionDecision(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-3"
                  >
                    <option value="">Select decision</option>
                    <option value="buyer">Rule in favor of buyer</option>
                    <option value="seller">Rule in favor of seller</option>
                    <option value="partial">Partial refund</option>
                    <option value="reject">Reject dispute</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        resolveDispute(selectedDispute.id, resolutionDecision)
                      }
                      className="px-4 py-2 bg-[#FF6600] text-white rounded-md text-sm hover:bg-[#e65c00]"
                    >
                      Apply Resolution
                    </button>
                    <button
                      onClick={() => setShowDetailModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
