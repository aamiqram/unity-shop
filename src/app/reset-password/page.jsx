"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock } from "react-icons/fi";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords don't match");
    // call API
    router.push("/login?reset=success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg border">
        <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
        <p className="text-gray-500 mb-6">Enter your new password below.</p>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              placeholder="New password"
              required
            />
          </div>
          <div className="relative mb-4">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              placeholder="Confirm new password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange text-white py-2 rounded-lg font-semibold"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
