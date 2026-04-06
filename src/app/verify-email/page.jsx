// app/verify-email/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiClock } from "react-icons/fi";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("john.doe@example.com"); // would come from registration state
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleResend = () => {
    // Simulate API call
    setResendDisabled(true);
    setResendSuccess(true);
    setCountdown(60);
    // In real app, call your auth API
    setTimeout(() => {
      setResendDisabled(false);
      setResendSuccess(false);
    }, 60000);
  };

  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendDisabled, countdown]);

  const handleChangeEmail = () => {
    router.push("/register?changeEmail=true");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <FiMail className="text-blue-600" size={32} />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Verify Your Email
        </h1>
        <p className="text-gray-600 mb-4">We've sent a verification link to:</p>
        <p className="font-semibold text-lg text-gray-800 mb-4">{email}</p>

        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-700 mb-4">
          <p>
            Click the link in the email to verify your account. The link expires
            in 24 hours.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Didn't receive the email?
          </p>
          <ul className="text-xs text-gray-500 list-disc list-inside mb-3 text-left">
            <li>Check your spam folder</li>
            <li>Make sure you entered the correct email address</li>
          </ul>

          {resendSuccess && (
            <p className="text-green-600 text-sm mb-2">
              ✓ Verification email resent!
            </p>
          )}

          <button
            onClick={handleResend}
            disabled={resendDisabled}
            className="w-full py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00] disabled:opacity-50 disabled:cursor-not-allowed mb-2"
          >
            {resendDisabled
              ? `Resend available in ${countdown}s`
              : "Resend Verification Email"}
          </button>

          <button
            onClick={handleChangeEmail}
            className="text-sm text-[#FF6600] hover:underline"
          >
            Change Email Address
          </button>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-[#FF6600]">
            Skip for now – Continue to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// Email template description:
/*
Subject: Verify your Unity Shop account

Hi [User Name],

Thanks for signing up! Please verify your email address to activate your account.

Click the button below to verify:
[VERIFY BUTTON] Verify Email

Or copy and paste this link into your browser:
[verification link]

This link expires in 24 hours.

If you didn't create an account with Unity Shop, please ignore this email.

Thanks,
The Unity Shop Team
*/
