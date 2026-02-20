"use client";
import Link from "next/link";
import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange to-orange/70 text-white flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-xl mb-8">
          Sign in to access your orders, wishlist, and more.
        </p>
        <ul className="space-y-4 text-lg">
          <li>✓ Track your orders in real-time</li>
          <li>✓ Manage your wishlist</li>
          <li>✓ Exclusive member deals</li>
        </ul>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-2">Sign In</h2>
          <p className="text-gray-500 mb-6">
            New to Unity Shop?{" "}
            <Link href="/register" className="text-orange">
              Create account
            </Link>
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="accent-orange" />{" "}
                <span className="ml-2 text-sm">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-orange hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-orange text-white py-3 rounded-lg font-semibold hover:bg-orange/90"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <button className="border rounded-lg py-2 hover:bg-gray-50">
                Google
              </button>
              <button className="border rounded-lg py-2 hover:bg-gray-50">
                Facebook
              </button>
              <button className="border rounded-lg py-2 hover:bg-gray-50">
                Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
