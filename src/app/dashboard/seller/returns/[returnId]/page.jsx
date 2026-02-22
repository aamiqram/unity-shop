// app/dashboard/seller/returns/[returnId]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SellerLayout from "@/components/seller/SellerLayout";
import { mockReturns } from "@/lib/returnData";
import { FiArrowLeft, FiCheckCircle, FiXCircle, FiTruck } from "react-icons/fi";

export default function SellerReturnDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [returnReq, setReturnReq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sellerNote, setSellerNote] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const found = mockReturns.find((r) => r.id === params.returnId);
      setReturnReq(found);
      if (found) {
        setRefundAmount(found.price.toString());
      }
      setLoading(false);
    }, 500);
  }, [params.returnId]);

  const handleApprove = () => {
    // In real app, call API
    alert(`Return ${returnReq.id} approved`);
    router.push("/dashboard/seller/returns");
  };

  const handleReject = () => {
    alert(`Return ${returnReq.id} rejected`);
    router.push("/dashboard/seller/returns");
  };

  const handleMarkReceived = () => {
    alert(`Return ${returnReq.id} marked as received`);
  };

  const handleProcessRefund = () => {
    alert(`Refund of $${refundAmount} processed`);
  };

  if (loading) return <SellerLayout>Loading...</SellerLayout>;
  if (!returnReq) return <SellerLayout>Return not found</SellerLayout>;

  return (
    <SellerLayout>
      <div>
        <Link
          href="/dashboard/seller/returns"
          className="inline-flex items-center text-gray-600 hover:text-[#FF6600] mb-4"
        >
          <FiArrowLeft className="mr-1" /> Back to Returns
        </Link>

        <h1 className="text-2xl font-bold mb-2">
          Return Request #{returnReq.id}
        </h1>
        <p className="text-gray-600 mb-4">
          Order #{returnReq.orderId} · {returnReq.buyerName}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Product info */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h2 className="font-semibold mb-3">Product Details</h2>
              <div className="flex items-center gap-3">
                <Image
                  src={returnReq.productImage}
                  alt={returnReq.productName}
                  width={64}
                  height={64}
                  className="rounded"
                />
                <div>
                  <p className="font-medium">{returnReq.productName}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {returnReq.quantity} · Price: ${returnReq.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Reason and evidence */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h2 className="font-semibold mb-2">Buyer's Reason</h2>
              <p className="text-sm bg-gray-50 p-2 rounded">
                {returnReq.reasonText}
              </p>
              {returnReq.evidence.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-1">Evidence</p>
                  <div className="flex gap-2">
                    {returnReq.evidence.map((file, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="text-xs text-[#FF6600] hover:underline"
                      >
                        {file}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            {returnReq.messages.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h2 className="font-semibold mb-2">Messages</h2>
                {returnReq.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-gray-50 p-2 rounded mb-2 text-sm"
                  >
                    <span className="font-medium">{msg.from}:</span> {msg.text}
                    <p className="text-xs text-gray-400 text-right">
                      {new Date(msg.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Timeline */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h2 className="font-semibold mb-2">Timeline</h2>
              {returnReq.timeline.map((event, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-sm border-b border-gray-100 last:border-0 py-2"
                >
                  <span className="text-gray-400 w-24">
                    {new Date(event.at).toLocaleDateString()}
                  </span>
                  <span className="font-medium">{event.by}:</span>
                  <span className="text-gray-600">{event.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action panel */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-24 space-y-4">
              <h2 className="font-semibold">Actions</h2>

              {/* Status selection */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Update Status
                </label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                  <option>Return requested</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                  <option>Item received by seller</option>
                  <option>Refund processed</option>
                </select>
              </div>

              {/* Seller note */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Private Note
                </label>
                <textarea
                  rows="2"
                  value={sellerNote}
                  onChange={(e) => setSellerNote(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  placeholder="Add internal note..."
                />
              </div>

              {/* Refund amount (if refund) */}
              {returnReq.resolution === "refund" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Refund Amount ($)
                  </label>
                  <input
                    type="number"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    step="0.01"
                  />
                </div>
              )}

              {/* Return tracking (if approved) */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Return Tracking Number
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  placeholder="Enter tracking #"
                />
                <select
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-2"
                >
                  <option value="">Select carrier</option>
                  <option value="UPS">UPS</option>
                  <option value="FedEx">FedEx</option>
                  <option value="USPS">USPS</option>
                  <option value="DHL">DHL</option>
                </select>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2">
                {returnReq.status === "Return requested" && (
                  <>
                    <button
                      onClick={handleApprove}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      <FiCheckCircle size={16} /> Approve
                    </button>
                    <button
                      onClick={handleReject}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
                    >
                      <FiXCircle size={16} /> Reject
                    </button>
                  </>
                )}
                {returnReq.status === "Approved" && (
                  <button
                    onClick={handleMarkReceived}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <FiTruck size={16} /> Mark as Received
                  </button>
                )}
                {returnReq.status === "Item received by seller" && (
                  <button
                    onClick={handleProcessRefund}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
                  >
                    Process Refund
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Changes will be saved automatically after each action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}
