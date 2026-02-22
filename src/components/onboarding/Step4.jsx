// components/onboarding/Step4.jsx
"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import { useState } from "react";

export default function Step4() {
  const { formData, updateForm, nextStep, prevStep } = useOnboarding();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateForm({ [name]: type === "checkbox" ? checked : value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.contactName)
      newErrors.contactName = "Contact person name is required";
    if (!formData.contactPhone)
      newErrors.contactPhone = "Contact phone is required";
    if (!formData.contactEmail)
      newErrors.contactEmail = "Contact email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.contactEmail))
      newErrors.contactEmail = "Email is invalid";
    if (!formData.addressLine1) newErrors.addressLine1 = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zip) newErrors.zip = "ZIP is required";
    return newErrors;
  };

  const handleContinue = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Contact & Address</h2>

      <div className="space-y-4">
        <h3 className="font-semibold">Contact Person</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${
                errors.contactName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.contactName && (
              <p className="text-xs text-red-500 mt-1">{errors.contactName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${
                errors.contactPhone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.contactPhone && (
              <p className="text-xs text-red-500 mt-1">{errors.contactPhone}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.contactEmail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.contactEmail && (
            <p className="text-xs text-red-500 mt-1">{errors.contactEmail}</p>
          )}
        </div>

        <h3 className="font-semibold mt-4">Store Address</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1 *
          </label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.addressLine1 ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.addressLine1 && (
            <p className="text-xs text-red-500 mt-1">{errors.addressLine1}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 2
          </label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.city && (
              <p className="text-xs text-red-500 mt-1">{errors.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.state && (
              <p className="text-xs text-red-500 mt-1">{errors.state}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ZIP *
            </label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${
                errors.zip ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.zip && (
              <p className="text-xs text-red-500 mt-1">{errors.zip}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option>USA</option>
            <option>Canada</option>
            <option>UK</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="sameWarehouse"
              checked={formData.sameWarehouse}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm">
              Warehouse address same as store address
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="px-6 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
