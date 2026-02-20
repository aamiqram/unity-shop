"use client";
import Link from "next/link";
import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiPhone,
} from "react-icons/fi";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    accountType: "buyer",
  });

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange to-orange/70 text-white flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-4">Join Unity Shop</h1>
        <p className="text-xl mb-8">Start buying or selling today</p>
        <ul className="space-y-4 text-lg">
          <li>✓ Millions of products</li>
          <li>✓ Verified sellers</li>
          <li>✓ Secure payments</li>
        </ul>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-500 mb-6">
            Already have an account?{" "}
            <Link href="/login" className="text-orange">
              Sign in
            </Link>
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number (optional)
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                I want to
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="buyer"
                    className="mr-1 accent-orange"
                  />{" "}
                  Buyer
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="seller"
                    className="mr-1 accent-orange"
                  />{" "}
                  Seller
                </label>
              </div>
            </div>

            <label className="flex items-start">
              <input type="checkbox" className="mt-1 accent-orange" />
              <span className="ml-2 text-sm">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            <button
              type="submit"
              className="w-full bg-orange text-white py-3 rounded-lg font-semibold"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
