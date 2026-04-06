// app/verify-email/error/page.jsx
"use client";

import Link from "next/link";
import { FiXCircle } from "react-icons/fi";

export default function VerifyEmailErrorPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <FiXCircle className="text-red-600" size={32} />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Verification Failed
        </h1>
        <p className="text-gray-600 mb-4">
          The verification link is invalid or has expired.
        </p>

        <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700 mb-4">
          <p>Links expire after 24 hours for security.</p>
        </div>

        <Link
          href="/verify-email"
          className="inline-block px-6 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
        >
          Request New Link
        </Link>

        <div className="mt-3">
          <Link
            href="/contact"
            className="text-sm text-[#FF6600] hover:underline"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
