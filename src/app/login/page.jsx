// app/login/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setLoginError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setLoginError("");

    // Simulate API call
    setTimeout(() => {
      // For demo, accept any email/password that passes validation
      // In a real app, you'd call your auth endpoint
      setIsLoading(false);
      // Redirect to dashboard or home
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left side - Branding */}
      <div className="lg:w-1/2 bg-gradient-to-br from-[#FF6600] to-orange-600 p-8 lg:p-12 flex flex-col justify-center items-center text-white">
        <div className="max-w-md">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg mb-8 text-orange-100">
            Access your orders, track shipments, and manage your wishlist with
            Unity Shop.
          </p>
          <ul className="space-y-3 text-orange-100">
            <li className="flex items-center gap-2">
              <span className="text-white">✓</span> Access your order history
            </li>
            <li className="flex items-center gap-2">
              <span className="text-white">✓</span> Track shipments in real time
            </li>
            <li className="flex items-center gap-2">
              <span className="text-white">✓</span> Manage your wishlist
            </li>
            <li className="flex items-center gap-2">
              <span className="text-white">✓</span> Exclusive member deals
            </li>
          </ul>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
            <p className="text-gray-600 mt-2">
              New to Unity Shop?{" "}
              <Link
                href="/register"
                className="text-[#FF6600] hover:underline font-medium"
              >
                Create account
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-2 rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-[#FF6600] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error message */}
            {loginError && (
              <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
                {loginError}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#FF6600] hover:bg-[#e65c00] text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <FaGoogle className="text-red-500" size={18} />
            </button>
            <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <FaFacebookF className="text-blue-600" size={18} />
            </button>
            <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <FaApple className="text-gray-800" size={18} />
            </button>
          </div>

          {/* Security note */}
          <p className="text-xs text-center text-gray-400 mt-6">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-[#FF6600] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#FF6600] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
