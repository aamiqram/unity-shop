// app/error.jsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiHome, FiRefreshCw, FiAlertCircle } from "react-icons/fi";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
        <div className="text-9xl font-bold text-red-500 opacity-20">500</div>
        <FiAlertCircle className="mx-auto text-red-500 text-5xl mt-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">
          Something went wrong
        </h1>
        <p className="text-gray-600 mt-2">
          We're working on fixing this. Please try again soon.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
          >
            <FiRefreshCw size={18} /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            <FiHome size={18} /> Go to Homepage
          </Link>
        </div>

        {/* Error ID (for support) */}
        <p className="text-xs text-gray-400 mt-4">
          Error ID: {error?.digest || "unknown"} <br />
          Our team has been notified.
        </p>

        {/* Alternative links */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">
            While you wait, you might like:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/deals"
              className="text-sm text-[#FF6600] hover:underline"
            >
              Deals
            </Link>
            <Link
              href="/categories"
              className="text-sm text-[#FF6600] hover:underline"
            >
              Categories
            </Link>
            <Link
              href="/blog"
              className="text-sm text-[#FF6600] hover:underline"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
