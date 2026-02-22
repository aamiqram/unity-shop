// components/onboarding/Step2.jsx
"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import { useState } from "react";

export default function Step2() {
  const { formData, updateForm, nextStep, prevStep } = useOnboarding();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateForm({ [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName)
      newErrors.companyName = "Company/Store name is required";
    if (formData.accountType === "business" && !formData.registrationNumber)
      newErrors.registrationNumber = "Registration number is required";
    if (!formData.businessEmail)
      newErrors.businessEmail = "Business email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.businessEmail))
      newErrors.businessEmail = "Email is invalid";
    if (!formData.businessPhone)
      newErrors.businessPhone = "Business phone is required";
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
      <h2 className="text-2xl font-bold mb-4">Business Information</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company/Store Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.companyName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.companyName && (
            <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Type
          </label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select</option>
            <option value="sole">Sole proprietorship</option>
            <option value="partnership">Partnership</option>
            <option value="corporation">Corporation</option>
            <option value="llc">LLC</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Registration Number{" "}
            {formData.accountType === "business" && (
              <span className="text-red-500">*</span>
            )}
          </label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.registrationNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.registrationNumber && (
            <p className="text-xs text-red-500 mt-1">
              {errors.registrationNumber}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tax ID / VAT Number
          </label>
          <input
            type="text"
            name="taxId"
            value={formData.taxId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.businessEmail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.businessEmail && (
            <p className="text-xs text-red-500 mt-1">{errors.businessEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="businessPhone"
            value={formData.businessPhone}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.businessPhone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.businessPhone && (
            <p className="text-xs text-red-500 mt-1">{errors.businessPhone}</p>
          )}
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
