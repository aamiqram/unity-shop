// app/verify-email/success/page.jsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiCheckCircle } from "react-icons/fi";

export default function VerifyEmailSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 animate-pulse">
          <FiCheckCircle className="text-green-600" size={32} />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Email Verified!
        </h1>
        <p className="text-gray-600 mb-4">
          Your email has been successfully verified. Welcome to Unity Shop!
        </p>

        <div className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-700 mb-4">
          <p>You now have full access to all features.</p>
        </div>

        <Link
          href="/dashboard"
          className="inline-block px-6 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
        >
          Go to Dashboard
        </Link>

        <p className="text-xs text-gray-400 mt-4">
          Redirecting in 3 seconds...
        </p>
      </div>
    </div>
  );
}
