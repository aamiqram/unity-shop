// app/orders/[orderId]/return/page.jsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiUpload, FiX, FiArrowLeft } from "react-icons/fi";
import { returnReasons, resolutionOptions } from "@/lib/returnData";

// Mock order data (would come from API)
const mockOrder = {
  id: "ORD-12345",
  date: "2025-02-15",
  seller: "Shenzhen Tech Co.",
  items: [
    {
      id: "prod1",
      name: "Wireless Bluetooth Earbuds",
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=100&auto=format",
      quantity: 2,
      price: 29.99,
      returnable: true,
      returnWindowEnd: "2025-03-17", // 30 days
    },
    {
      id: "prod2",
      name: "USB-C Charging Cable",
      image:
        "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=100&auto=format",
      quantity: 1,
      price: 9.99,
      returnable: true,
      returnWindowEnd: "2025-03-17",
    },
  ],
};

export default function ReturnRequestPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState([]);
  const [formData, setFormData] = useState({
    reason: "",
    reasonText: "",
    resolution: "",
  });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleItemToggle = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected].slice(0, 8));
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    if (selectedItems.length === 0)
      newErrors.items = "Select at least one item to return";
    if (!formData.reason) newErrors.reason = "Please select a reason";
    if (!formData.reasonText.trim())
      newErrors.reasonText = "Please provide details";
    if (formData.reasonText.length < 20)
      newErrors.reasonText = "Description must be at least 20 characters";
    if (!formData.resolution)
      newErrors.resolution = "Please select a resolution";
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
      router.push(`/orders/${params.orderId}/return/success`);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        href={`/orders/${params.orderId}`}
        className="inline-flex items-center text-gray-600 hover:text-[#FF6600] mb-4"
      >
        <FiArrowLeft className="mr-1" /> Back to Order
      </Link>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-2">Request Return</h1>
        <p className="text-gray-600 mb-4">Order #{params.orderId}</p>

        {/* Return window info */}
        <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm mb-4">
          You have until{" "}
          {new Date(mockOrder.items[0].returnWindowEnd).toLocaleDateString()} to
          return items.
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Eligible items */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select items to return <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {mockOrder.items.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemToggle(item.id)}
                    className="mt-1"
                  />
                  <div className="w-12 h-12 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity} · ${item.price.toFixed(2)} each
                    </p>
                    <p className="text-xs text-green-600">
                      Return window ends {item.returnWindowEnd}
                    </p>
                  </div>
                </label>
              ))}
            </div>
            {errors.items && (
              <p className="text-xs text-red-500 mt-1">{errors.items}</p>
            )}
          </div>

          {/* Reason dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for return <span className="text-red-500">*</span>
            </label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${errors.reason ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select a reason</option>
              {returnReasons.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            {errors.reason && (
              <p className="text-xs text-red-500 mt-1">{errors.reason}</p>
            )}
          </div>

          {/* Detailed explanation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Detailed explanation <span className="text-red-500">*</span>
            </label>
            <textarea
              name="reasonText"
              rows="3"
              value={formData.reasonText}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${errors.reasonText ? "border-red-500" : "border-gray-300"}`}
              placeholder="Please describe the issue..."
            />
            {errors.reasonText && (
              <p className="text-xs text-red-500 mt-1">{errors.reasonText}</p>
            )}
          </div>

          {/* Photo upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload photos/videos (optional, max 8 files)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
                id="return-upload"
              />
              <label
                htmlFor="return-upload"
                className="cursor-pointer text-[#FF6600] hover:underline"
              >
                Click to upload
              </label>
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
              name="resolution"
              value={formData.resolution}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${errors.resolution ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select resolution</option>
              {resolutionOptions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            {errors.resolution && (
              <p className="text-xs text-red-500 mt-1">{errors.resolution}</p>
            )}
          </div>

          {/* Who pays shipping? (info) */}
          <p className="text-xs text-gray-500">
            Note: If the return is due to seller error (damaged/wrong item),
            return shipping is free. Otherwise, return shipping may be deducted
            from refund.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00] disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Return Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
