// app/orders/[orderId]/dispute/page.jsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiUpload, FiX, FiArrowLeft } from "react-icons/fi";
import { disputeReasons, resolutionOptions } from "@/lib/disputeData";

// Mock order data (would come from API)
const mockOrder = {
  id: "ORD-12345",
  date: "2025-02-15",
  seller: "Shenzhen Tech Co.",
  products: [
    {
      id: "prod1",
      name: "Wireless Bluetooth Earbuds",
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=100&auto=format",
      quantity: 2,
      price: 29.99,
    },
  ],
  total: 59.98,
};

export default function DisputeFormPage() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    reason: "",
    description: "",
    preferredResolution: "",
    amount: "",
  });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected].slice(0, 10));
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.reason) newErrors.reason = "Please select a reason";
    if (!formData.description.trim())
      newErrors.description = "Please provide details";
    if (formData.description.length < 20)
      newErrors.description = "Description must be at least 20 characters";
    if (!formData.preferredResolution)
      newErrors.preferredResolution = "Please select a preferred resolution";
    if (formData.preferredResolution === "partial_refund" && !formData.amount) {
      newErrors.amount = "Please enter the amount for partial refund";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
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
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <FiCheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Dispute Submitted
          </h2>
          <p className="text-gray-600 mb-4">
            Your dispute has been submitted. The seller has 48 hours to respond.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Dispute ID: DSP-{Date.now()}
            </p>
            <p className="text-sm text-gray-500">
              We'll notify you via email when there's an update.
            </p>
          </div>
          <div className="mt-6 flex gap-3 justify-center">
            <Link
              href={`/orders/${params.orderId}`}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back to Order
            </Link>
            <Link
              href="/dashboard/disputes"
              className="px-4 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
            >
              View My Disputes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        href={`/orders/${params.orderId}`}
        className="inline-flex items-center text-gray-600 hover:text-[#FF6600] mb-4"
      >
        <FiArrowLeft className="mr-1" /> Back to Order
      </Link>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-2">Open a Dispute</h1>
        <p className="text-gray-600 mb-4">Order #{params.orderId}</p>

        {/* Order summary */}
        <div className="bg-gray-50 p-3 rounded-lg mb-6">
          <p className="font-medium mb-2">Items in this order:</p>
          {mockOrder.products.map((p) => (
            <div key={p.id} className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 relative">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={32}
                  height={32}
                  className="rounded"
                />
              </div>
              <span className="flex-1">
                {p.name} x{p.quantity}
              </span>
              <span>${(p.price * p.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-medium">
            <span>Total</span>
            <span>${mockOrder.total.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for dispute <span className="text-red-500">*</span>
            </label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${
                errors.reason ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a reason</option>
              {disputeReasons.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            {errors.reason && (
              <p className="text-xs text-red-500 mt-1">{errors.reason}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Detailed description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Please provide as much detail as possible..."
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Evidence upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload evidence (images/documents, up to 10 files)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="evidence-upload"
              />
              <label
                htmlFor="evidence-upload"
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
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Preferred resolution */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred resolution <span className="text-red-500">*</span>
            </label>
            <select
              name="preferredResolution"
              value={formData.preferredResolution}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${
                errors.preferredResolution
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select resolution</option>
              {resolutionOptions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            {errors.preferredResolution && (
              <p className="text-xs text-red-500 mt-1">
                {errors.preferredResolution}
              </p>
            )}
          </div>

          {/* Partial refund amount (conditional) */}
          {formData.preferredResolution === "partial_refund" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Refund amount ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="0.01"
                max={mockOrder.total}
                step="0.01"
                className={`w-full border rounded px-3 py-2 ${
                  errors.amount ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.amount && (
                <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
              )}
            </div>
          )}

          <p className="text-xs text-gray-500">
            Note: The seller will have 48 hours to respond. If they don't
            respond, you can request admin review.
          </p>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00] disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Dispute"}
            </button>
            <Link
              href={`/orders/${params.orderId}`}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
