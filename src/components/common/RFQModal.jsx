// components/common/RFQModal.jsx
"use client";

import { useState, useRef } from "react";
import { FiX, FiUpload, FiCheckCircle } from "react-icons/fi";

const RFQModal = ({ isOpen, onClose, productName = "" }) => {
  const [formData, setFormData] = useState({
    productName: productName,
    requirements: "",
    quantity: "",
    unit: "pieces",
    targetPrice: "",
    destinationCountry: "",
    destinationCity: "",
    expectedDate: "",
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
  });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

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
    setFiles((prev) => [...prev, ...selectedFiles].slice(0, 5)); // max 5 files
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.productName.trim())
      newErrors.productName = "Product name is required";
    if (!formData.requirements.trim())
      newErrors.requirements = "Requirements are required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    else if (isNaN(formData.quantity) || Number(formData.quantity) <= 0)
      newErrors.quantity = "Quantity must be a positive number";
    if (!formData.destinationCountry)
      newErrors.destinationCountry = "Destination country is required";
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone number is required";
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
      setIsSuccess(true);
      // Reset form after success (optional)
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="rfq-modal"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3
                className="text-lg font-semibold text-gray-900"
                id="rfq-modal-title"
              >
                Request for Quotation
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>

            {isSuccess ? (
              <div className="py-8 text-center">
                <FiCheckCircle className="mx-auto text-green-500" size={48} />
                <p className="mt-4 text-lg font-medium text-gray-900">
                  Quote Request Sent!
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Suppliers will respond to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Product name */}
                <div className="mb-4">
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="productName"
                    id="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600] ${
                      errors.productName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., Wireless Earbuds"
                  />
                  {errors.productName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.productName}
                    </p>
                  )}
                </div>

                {/* Detailed requirements */}
                <div className="mb-4">
                  <label
                    htmlFor="requirements"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Detailed Requirements{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="requirements"
                    id="requirements"
                    rows="3"
                    value={formData.requirements}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600] ${
                      errors.requirements ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Describe your specific needs, quality requirements, packaging, etc."
                  />
                  {errors.requirements && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.requirements}
                    </p>
                  )}
                </div>

                {/* Quantity and unit */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600] ${
                        errors.quantity ? "border-red-500" : "border-gray-300"
                      }`}
                      min="1"
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.quantity}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="unit"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Unit
                    </label>
                    <select
                      name="unit"
                      id="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                    >
                      <option value="pieces">Pieces</option>
                      <option value="kg">Kilograms (kg)</option>
                      <option value="tons">Tons</option>
                      <option value="sets">Sets</option>
                      <option value="boxes">Boxes</option>
                      <option value="liters">Liters</option>
                    </select>
                  </div>
                </div>

                {/* Target price */}
                <div className="mb-4">
                  <label
                    htmlFor="targetPrice"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Target Price (optional)
                  </label>
                  <input
                    type="number"
                    name="targetPrice"
                    id="targetPrice"
                    value={formData.targetPrice}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                    placeholder="e.g., 5.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Shipping destination */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label
                      htmlFor="destinationCountry"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="destinationCountry"
                      id="destinationCountry"
                      value={formData.destinationCountry}
                      onChange={handleChange}
                      className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600] ${
                        errors.destinationCountry
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="e.g., United States"
                    />
                    {errors.destinationCountry && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.destinationCountry}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="destinationCity"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City (optional)
                    </label>
                    <input
                      type="text"
                      name="destinationCity"
                      id="destinationCity"
                      value={formData.destinationCity}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                      placeholder="e.g., New York"
                    />
                  </div>
                </div>

                {/* Expected delivery date */}
                <div className="mb-4">
                  <label
                    htmlFor="expectedDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Expected Delivery Date (optional)
                  </label>
                  <input
                    type="date"
                    name="expectedDate"
                    id="expectedDate"
                    value={formData.expectedDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                  />
                </div>

                {/* File attachments */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachments (optional, max 5 files)
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-[#FF6600]"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FiUpload className="mx-auto text-gray-400" size={24} />
                    <p className="mt-1 text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      Images, PDFs, specs (max 10MB each)
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      multiple
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      className="hidden"
                    />
                  </div>
                  {files.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {files.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded"
                        >
                          <span className="truncate max-w-[200px]">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiX size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Contact information */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600] ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.fullName}
                      </p>
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
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600] ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600] ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="+1 234 567 890"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Company Name (optional)
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                      placeholder="ABC Corp"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#FF6600] text-base font-medium text-white hover:bg-[#e65c00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6600] sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFQModal;
