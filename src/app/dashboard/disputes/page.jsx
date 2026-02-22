// app/dashboard/disputes/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockDisputes, disputeStatuses } from "@/lib/disputeData";
import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
} from "react-icons/fi";

export default function BuyerDisputesPage() {
  const [disputes] = useState(mockDisputes); // In real app, filter by current buyer

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
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-2">My Disputes</h1>
        <p className="text-gray-600 mb-6">
          Track and manage your order disputes
        </p>

        {disputes.length === 0 ? (
          <div className="bg-white p-8 text-center border border-gray-200 rounded-lg">
            <p className="text-gray-500">
              You haven't opened any disputes yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {disputes.map((dispute) => (
              <div
                key={dispute.id}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{dispute.id}</span>
                      <span className="text-xs text-gray-500">
                        for order {dispute.orderId}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(dispute.status)}
                      <span className="text-sm font-medium">
                        {dispute.status}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/dashboard/disputes/${dispute.id}`}
                    className="text-sm text-[#FF6600] hover:underline"
                  >
                    View Details
                  </Link>
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
                    <p className="font-medium text-sm">{dispute.productName}</p>
                    <p className="text-xs text-gray-500">
                      Reason: {dispute.reason}
                    </p>
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-500">
                  Opened: {new Date(dispute.openedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
