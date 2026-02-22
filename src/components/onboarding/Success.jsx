// components/onboarding/Success.jsx
"use client";

import Link from "next/link";
import { FiCheckCircle, FiClock } from "react-icons/fi";

export default function Success() {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
        <FiCheckCircle className="text-green-600" size={32} />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Application Submitted!
      </h2>
      <p className="text-gray-600 mb-4">
        We'll review your application and get back to you within 2-3 business
        days.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
        <h3 className="font-semibold mb-2">What happens next?</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs font-bold flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <p className="font-medium">Review (1-2 days)</p>
              <p className="text-xs text-gray-500">
                Our team reviews your information and documents.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <p className="font-medium">Verification (1 day)</p>
              <p className="text-xs text-gray-500">
                We verify your identity and business details.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-xs font-bold flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <p className="font-medium">Account Activation (instant)</p>
              <p className="text-xs text-gray-500">
                Once approved, you can start selling immediately.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Link
        href="/dashboard/seller"
        className="inline-block px-6 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
      >
        Check Application Status
      </Link>
      <p className="text-xs text-gray-400 mt-4">
        We've sent a confirmation email with next steps.
      </p>
    </div>
  );
}
