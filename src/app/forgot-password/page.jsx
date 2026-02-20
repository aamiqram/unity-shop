"use client";
import Link from "next/link";
import { useState } from "react";
import { FiMail, FiArrowLeft } from "react-icons/fi";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg border shadow-sm">
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-gray-500 mb-4 hover:text-orange"
        >
          <FiArrowLeft className="mr-1" /> Back to login
        </Link>

        {!submitted ? (
          <>
            <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
            <p className="text-gray-500 mb-6">
              Enter your email and we'll send you a reset link.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange text-white py-2 rounded-lg font-semibold"
              >
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              ✉️
            </div>
            <h2 className="text-xl font-bold mb-2">Check your email</h2>
            <p className="text-gray-500 mb-4">
              We've sent a reset link to{" "}
              <span className="font-medium">{email}</span>
            </p>
            <button className="text-orange text-sm">Resend email</button>
          </div>
        )}
      </div>
    </div>
  );
}
