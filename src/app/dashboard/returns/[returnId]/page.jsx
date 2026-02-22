// app/dashboard/returns/[returnId]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockReturns, returnStatuses } from "@/lib/returnData";
import { FiArrowLeft, FiMessageSquare, FiTruck } from "react-icons/fi";

const statusSteps = [
  { key: "Return requested", label: "Requested" },
  { key: "Approved", label: "Approved" },
  { key: "Return label generated", label: "Label Generated" },
  { key: "Item shipped back", label: "Shipped" },
  { key: "Item received by seller", label: "Received" },
  { key: "Inspected", label: "Inspected" },
  { key: "Refund processed", label: "Refunded" },
  { key: "Closed", label: "Closed" },
];

export default function ReturnTrackingPage() {
  const params = useParams();
  const [returnReq, setReturnReq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const found = mockReturns.find((r) => r.id === params.returnId);
      setReturnReq(found);
      setLoading(false);
    }, 500);
  }, [params.returnId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div>Loading...</div>
      </DashboardLayout>
    );
  }

  if (!returnReq) {
    return (
      <DashboardLayout>
        <div>Return not found.</div>
      </DashboardLayout>
    );
  }

  const currentStepIndex = statusSteps.findIndex(
    (s) => s.key === returnReq.status,
  );

  return (
    <DashboardLayout>
      <div>
        <Link
          href="/dashboard/returns"
          className="inline-flex items-center text-gray-600 hover:text-[#FF6600] mb-4"
        >
          <FiArrowLeft className="mr-1" /> Back to Returns
        </Link>

        <h1 className="text-2xl font-bold mb-2">
          Return Request #{returnReq.id}
        </h1>

        {/* Status timeline */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Current Status:</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {returnReq.status}
            </span>
          </div>
          <div className="relative flex items-center justify-between mt-4">
            {statusSteps.map((step, idx) => {
              const isCompleted = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div
                  key={step.key}
                  className="flex flex-col items-center w-12 text-center"
                >
                  <div
                    className={`w-4 h-4 rounded-full mb-1 ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    } ${isCurrent ? "ring-2 ring-[#FF6600] ring-offset-2" : ""}`}
                  />
                  <span className="text-xs text-gray-600">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Return details */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 relative">
              <Image
                src={returnReq.productImage}
                alt={returnReq.productName}
                width={64}
                height={64}
                className="rounded"
              />
            </div>
            <div>
              <p className="font-medium">{returnReq.productName}</p>
              <p className="text-sm text-gray-500">
                Quantity: {returnReq.quantity} · Price: ${returnReq.price}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-gray-500">Reason</p>
              <p>{returnReq.reason}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Resolution</p>
              <p className="capitalize">{returnReq.resolution}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Request Date</p>
              <p>{new Date(returnReq.requestDate).toLocaleDateString()}</p>
            </div>
            {returnReq.refundAmount && (
              <div>
                <p className="text-xs text-gray-500">Refund Amount</p>
                <p className="text-green-600">
                  ${returnReq.refundAmount.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          {/* Tracking info */}
          {returnReq.trackingNumber && (
            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-500">Return Tracking</p>
              <p className="font-mono text-sm">
                {returnReq.trackingNumber} ({returnReq.carrier})
              </p>
              <a
                href="#"
                className="text-xs text-[#FF6600] hover:underline flex items-center gap-1"
              >
                <FiTruck size={12} /> Track package
              </a>
            </div>
          )}

          {/* Return label */}
          {returnReq.returnLabel && (
            <div className="border-t border-gray-100 pt-3">
              <a
                href={returnReq.returnLabel}
                className="text-[#FF6600] hover:underline text-sm"
                download
              >
                Download Return Label
              </a>
            </div>
          )}

          {/* Timeline */}
          <div className="border-t border-gray-100 pt-3">
            <p className="text-sm font-medium mb-2">Timeline</p>
            <div className="space-y-2">
              {returnReq.timeline.map((event, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <span className="text-gray-400 w-24">
                    {new Date(event.at).toLocaleDateString()}
                  </span>
                  <span className="font-medium">{event.by}:</span>
                  <span className="text-gray-600">{event.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Messages */}
          {returnReq.messages.length > 0 && (
            <div className="border-t border-gray-100 pt-3">
              <p className="text-sm font-medium mb-2">Messages</p>
              {returnReq.messages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-gray-50 p-2 rounded mb-2 text-xs"
                >
                  <span className="font-medium">{msg.from}:</span> {msg.text}
                  <span className="text-gray-400 block text-right">
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Contact seller button */}
          <button className="flex items-center gap-2 text-[#FF6600] hover:underline text-sm">
            <FiMessageSquare size={14} /> Message Seller
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
