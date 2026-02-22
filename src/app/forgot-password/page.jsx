// app/forgot-password/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMail, FiArrowLeft, FiCheckCircle } from "react-icons/fi";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = () => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateEmail();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <FiMail className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Check your email
          </h2>
          <p className="text-gray-600 mb-4">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Click the link in the email to reset your password. If you don't see
            it, check your spam folder.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              className="px-6 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
            >
              Back to Login
            </Link>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Try another email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <Link
          href="/login"
          className="inline-flex items-center text-gray-600 hover:text-[#FF6600] mb-4"
        >
          <FiArrowLeft className="mr-1" /> Back to Sign In
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Forgot Password?
        </h1>
        <p className="text-gray-600 mb-6">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" size={18} />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                  error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#FF6600] focus:border-[#FF6600]"
                }`}
              />
            </div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-[#FF6600] hover:bg-[#e65c00] text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          Remember your password?{" "}
          <Link href="/login" className="text-[#FF6600] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
