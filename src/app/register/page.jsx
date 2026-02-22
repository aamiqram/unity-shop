// app/register/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
} from "react-icons/fi";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState("form"); // "form" or "verify"
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    accountType: "buyer", // "buyer" or "seller"
    agreeTerms: false,
    newsletter: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4

  // Password strength checker
  const checkPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear field error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    // Check password strength
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }
    // Phone is optional, but if provided, validate format
    if (
      formData.phone &&
      !/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/.test(
        formData.phone,
      )
    ) {
      newErrors.phone = "Invalid phone number";
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
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("verify");
      // In real app, you would send verification email
    }, 1500);
  };

  // Strength indicator colors and text
  const strengthLabels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  if (step === "verify") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <FiMail className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Verify your email
          </h2>
          <p className="text-gray-600 mb-4">
            We've sent a verification link to <strong>{formData.email}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Please check your inbox and click the link to activate your account.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
            >
              Go to Login
            </button>
            <button
              onClick={() => setStep("form")}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Edit Information
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Didn't receive the email? Check your spam folder or{" "}
            <button className="text-[#FF6600] hover:underline">resend</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left side - Branding */}
      <div className="lg:w-1/2 bg-gradient-to-br from-[#FF6600] to-orange-600 p-8 lg:p-12 flex flex-col justify-center items-center text-white">
        <div className="max-w-md">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Join Unity Shop
          </h1>
          <p className="text-lg mb-8 text-orange-100">
            Create an account and start exploring millions of products from
            trusted suppliers.
          </p>
          <ul className="space-y-3 text-orange-100">
            <li className="flex items-center gap-2">
              <span className="text-white">✓</span> Fast checkout
            </li>
            <li className="flex items-center gap-2">
              <span className="text-white">✓</span> Order tracking
            </li>
            <li className="flex items-center gap-2">
              <span className="text-white">✓</span> Exclusive offers
            </li>
            <li className="flex items-center gap-2">
              <span className="text-white">✓</span> Wishlist & saved items
            </li>
            <li className="flex items-center gap-2">
              <span className="text-white">✓</span> Personalized recommendations
            </li>
          </ul>
        </div>
      </div>

      {/* Right side - Registration form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-600 mt-2">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#FF6600] hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" size={18} />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                    errors.fullName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address <span className="text-red-500">*</span>
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

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password <span className="text-red-500">*</span>
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
              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 h-1.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-full flex-1 rounded-full transition-colors ${
                          i < passwordStrength
                            ? strengthColors[passwordStrength - 1]
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      passwordStrength <= 2
                        ? "text-red-500"
                        : passwordStrength <= 3
                          ? "text-yellow-600"
                          : "text-green-600"
                    }`}
                  >
                    {strengthLabels[passwordStrength - 1] || "Too weak"}
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" size={18} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Phone (optional) */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number (optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="text-gray-400" size={18} />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 890"
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                    errors.phone
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Account type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I want to:
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="accountType"
                    value="buyer"
                    checked={formData.accountType === "buyer"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">Buy</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="accountType"
                    value="seller"
                    checked={formData.accountType === "seller"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">Sell</span>
                </label>
              </div>
            </div>

            {/* Terms and newsletter */}
            <div className="space-y-2">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 mr-2"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-[#FF6600] hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-[#FF6600] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-xs text-red-500">{errors.agreeTerms}</p>
              )}

              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className="mt-1 mr-2"
                />
                <span className="text-sm text-gray-600">
                  Send me updates and exclusive offers
                </span>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#FF6600] hover:bg-[#e65c00] text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social registration */}
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
            By creating an account, you agree to our{" "}
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
