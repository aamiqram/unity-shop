// components/onboarding/Step5.jsx
"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import { useState } from "react";

const allCategories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Health & Beauty",
  "Sports & Outdoors",
  "Toys & Kids",
  "Automotive",
  "Office Supplies",
];

export default function Step5() {
  const { formData, updateForm, nextStep, prevStep } = useOnboarding();
  const [errors, setErrors] = useState({});

  const handleCategoryChange = (category) => {
    const current = formData.categories || [];
    const updated = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    updateForm({ categories: updated });
  };

  const validate = () => {
    const newErrors = {};
    if (formData.categories.length === 0)
      newErrors.categories = "Select at least one category";
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
      <h2 className="text-2xl font-bold mb-4">Categories & Products</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What will you sell? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {allCategories.map((cat) => (
              <label key={cat} className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={formData.categories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="mr-2"
                />
                {cat}
              </label>
            ))}
          </div>
          {errors.categories && (
            <p className="text-xs text-red-500 mt-1">{errors.categories}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected monthly sales volume
          </label>
          <select
            name="monthlySalesVolume"
            value={formData.monthlySalesVolume}
            onChange={(e) => updateForm({ monthlySalesVolume: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select</option>
            <option value="1-10">1-10 orders</option>
            <option value="11-50">11-50 orders</option>
            <option value="51-200">51-200 orders</option>
            <option value="200+">200+ orders</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            How many products will you list initially?
          </label>
          <input
            type="number"
            name="initialProducts"
            value={formData.initialProducts}
            onChange={(e) => updateForm({ initialProducts: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product upload method
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="productUploadMethod"
                value="manual"
                checked={formData.productUploadMethod === "manual"}
                onChange={(e) =>
                  updateForm({ productUploadMethod: e.target.value })
                }
                className="mr-2"
              />
              Manual
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="productUploadMethod"
                value="bulk"
                checked={formData.productUploadMethod === "bulk"}
                onChange={(e) =>
                  updateForm({ productUploadMethod: e.target.value })
                }
                className="mr-2"
              />
              Bulk upload (CSV)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="productUploadMethod"
                value="api"
                checked={formData.productUploadMethod === "api"}
                onChange={(e) =>
                  updateForm({ productUploadMethod: e.target.value })
                }
                className="mr-2"
              />
              API
            </label>
          </div>
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
