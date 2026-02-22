// app/dashboard/seller/disputes/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SellerLayout from "@/components/seller/SellerLayout";
import { mockDisputes } from "@/lib/disputeData";
import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
} from "react-icons/fi";

// Filter disputes for this seller (mock: assume seller id = "seller1")
const sellerDisputes = mockDisputes.filter((d) => d.sellerId === "seller1");

export default function SellerDisputesPage() {
  const [disputes, setDisputes] = useState(sellerDisputes);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [proposedResolution, setProposedResolution] = useState("");
  const [showResponseModal, setShowResponseModal] = useState(false);

  const openResponseModal = (dispute) => {
    setSelectedDispute(dispute);
    setResponseText("");
    setProposedResolution("");
    setShowResponseModal(true);
  };

  const submitResponse = () => {
    if (!responseText.trim()) return;
    // In real app, send to API
    console.log("Response submitted:", {
      disputeId: selectedDispute.id,
      responseText,
      proposedResolution,
    });
    setShowResponseModal(false);
    // Optionally update local state
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Open":
      case "Awaiting Seller Response":
        return <FiClock className="text-yellow-500" size={16} />;
      case "Under Review":
        return <FiAlertCircle className="text-blue-500" size={16} />;
      case "Resolved":
        return <FiCheckCircle className="text-green-500" size={16} />;
      case "Closed":
        return <FiXCircle className="text-gray-500" size={16} />;
      default:
        return null;
    }
  };

  return (
    <SellerLayout>
      <div>
        <h1 className="text-2xl font-bold mb-2">Dispute Resolution</h1>
        <p className="text-gray-600 mb-6">
          Manage customer disputes and respond within 48 hours
        </p>

        {disputes.length === 0 ? (
          <div className="bg-white p-8 text-center border border-gray-200 rounded-lg">
            <p className="text-gray-500">No disputes at this time.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {disputes.map((dispute) => {
              const hoursSinceOpened = Math.floor(
                (Date.now() - new Date(dispute.openedAt)) / (1000 * 60 * 60),
              );
              const timeLeft = 48 - hoursSinceOpened;
              const urgent = timeLeft < 12;

              return (
                <div
                  key={dispute.id}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{dispute.id}</span>
                        <span className="text-xs text-gray-500">
                          Order {dispute.orderId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(dispute.status)}
                        <span className="text-sm font-medium">
                          {dispute.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      {dispute.status === "Open" && (
                        <span
                          className={`text-xs ${urgent ? "text-red-600 font-semibold" : "text-orange-600"}`}
                        >
                          {timeLeft}h left to respond
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-12 h-12 relative">
                      <Image
                        src={dispute.productImage}
                        alt={dispute.productName}
                        width={48}
                        height={48}
                        className="rounded"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {dispute.productName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Buyer: {dispute.buyerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Reason: {dispute.reason}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => openResponseModal(dispute)}
                      className="px-3 py-1 bg-[#FF6600] text-white rounded text-sm hover:bg-[#e65c00]"
                    >
                      Respond
                    </button>
                    <Link
                      href={`/dashboard/seller/disputes/${dispute.id}`}
                      className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Response modal */}
      {showResponseModal && selectedDispute && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={() => setShowResponseModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Respond to Dispute</h2>
              <p className="text-sm text-gray-500">
                Dispute ID: {selectedDispute.id}
              </p>
            </div>
            <div className="p-4">
              <p className="text-sm mb-2">
                <span className="font-medium">Buyer's claim:</span>{" "}
                {selectedDispute.description}
              </p>
              <textarea
                placeholder="Your response..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                rows="4"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-3"
              />
              <label className="block text-sm font-medium mb-1">
                Proposed resolution (optional)
              </label>
              <select
                value={proposedResolution}
                onChange={(e) => setProposedResolution(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4"
              >
                <option value="">Select</option>
                <option value="accept">Accept buyer's request</option>
                <option value="partial">Offer partial refund</option>
                <option value="reject">Reject dispute</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={submitResponse}
                  disabled={!responseText.trim()}
                  className="flex-1 px-4 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00] disabled:opacity-50"
                >
                  Submit Response
                </button>
                <button
                  onClick={() => setShowResponseModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </SellerLayout>
  );
}
