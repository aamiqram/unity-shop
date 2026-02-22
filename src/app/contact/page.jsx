// app/contact/page.jsx
"use client";

import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiMapPin,
  FiSend,
} from "react-icons/fi";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    subject: "",
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    message: "",
  });
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles].slice(0, 3)); // max 3 files
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.length < 20)
      newErrors.message = "Message must be at least 20 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        subject: "",
        name: "",
        email: "",
        phone: "",
        orderNumber: "",
        message: "",
      });
      setFiles([]);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-r from-[#FF6600] to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto">
            We're here to help. Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Contact Form */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Send us a message
              </h2>

              {isSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm">
                    We'll get back to you within 24-48 hours.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Subject dropdown */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                      errors.subject
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#FF6600]"
                    }`}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Issue</option>
                    <option value="seller">Seller Support</option>
                    <option value="technical">Technical Problem</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#FF6600]"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#FF6600]"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone and Order Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="orderNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Order Number (if applicable)
                    </label>
                    <input
                      type="text"
                      id="orderNumber"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                      errors.message
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#FF6600]"
                    }`}
                    placeholder="Please describe your issue or question in detail..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* File attachment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachments (optional, up to 3 files)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                    <input
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-[#FF6600] hover:underline"
                    >
                      Click to upload
                    </label>
                    <p className="text-xs text-gray-400 mt-1">
                      or drag and drop (max 10MB each)
                    </p>
                  </div>
                  {files.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {files.map((file, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between text-xs bg-gray-50 px-2 py-1 rounded"
                        >
                          <span className="truncate max-w-[200px]">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00] transition-colors disabled:opacity-50"
                >
                  <FiSend size={18} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Right Column - Contact Info */}
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Other ways to reach us
              </h2>

              {/* Phone */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-start gap-3">
                  <FiPhone className="text-[#FF6600] text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone Support</h3>
                    <p className="text-sm text-gray-600">+1-800-555-1234</p>
                    <p className="text-xs text-gray-400">Available 24/7</p>
                    <button className="mt-2 text-sm text-[#FF6600] hover:underline">
                      Call Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-start gap-3">
                  <FiMail className="text-[#FF6600] text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="text-sm text-gray-600">
                      support@unityshop.com
                    </p>
                    <p className="text-xs text-gray-400">
                      Response within 24 hours
                    </p>
                    <a
                      href="mailto:support@unityshop.com"
                      className="mt-2 inline-block text-sm text-[#FF6600] hover:underline"
                    >
                      Email Us
                    </a>
                  </div>
                </div>
              </div>

              {/* Live Chat */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-start gap-3">
                  <FiMessageSquare className="text-[#FF6600] text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold">Live Chat</h3>
                    <p className="text-sm text-gray-600">Chat with us now</p>
                    <p className="text-xs text-gray-400">
                      Average response: 2 minutes
                    </p>
                    <button className="mt-2 text-sm text-[#FF6600] hover:underline">
                      Start Chat
                    </button>
                  </div>
                </div>
              </div>

              {/* Office Address */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-[#FF6600] text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold">Headquarters</h3>
                    <p className="text-sm text-gray-600">
                      123 Market Street, Suite 400
                      <br />
                      San Francisco, CA 94105
                      <br />
                      USA
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-[#FF6600] hover:underline"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
              </div>

              {/* Help Center Section */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-3">
                  Looking for quick answers?
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/help/shipping"
                    className="block text-sm text-gray-600 hover:text-[#FF6600]"
                  >
                    • Shipping & Delivery
                  </Link>
                  <Link
                    href="/help/returns"
                    className="block text-sm text-gray-600 hover:text-[#FF6600]"
                  >
                    • Returns & Refunds
                  </Link>
                  <Link
                    href="/help/payment"
                    className="block text-sm text-gray-600 hover:text-[#FF6600]"
                  >
                    • Payment Methods
                  </Link>
                  <Link
                    href="/help/orders"
                    className="block text-sm text-gray-600 hover:text-[#FF6600]"
                  >
                    • How to place an order
                  </Link>
                </div>
                <Link
                  href="/help"
                  className="inline-block mt-3 text-sm text-[#FF6600] hover:underline"
                >
                  Visit Help Center →
                </Link>
              </div>

              {/* Business Hours */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-3">Business Hours</h3>
                <p className="text-sm text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM EST
                </p>
                <p className="text-sm text-gray-600">
                  Saturday - Sunday: 10:00 AM - 4:00 PM EST
                </p>
              </div>

              {/* Social Media */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#FF6600] hover:text-white transition"
                  >
                    <FaFacebook size={16} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#FF6600] hover:text-white transition"
                  >
                    <FaTwitter size={16} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#FF6600] hover:text-white transition"
                  >
                    <FaInstagram size={16} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#FF6600] hover:text-white transition"
                  >
                    <FaLinkedin size={16} />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#FF6600] hover:text-white transition"
                  >
                    <FaYoutube size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
