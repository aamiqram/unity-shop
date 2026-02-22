// components/onboarding/Step7.jsx
"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import { useState } from "react";

export default function Step7() {
  const { formData, updateForm, nextStep, prevStep } = useOnboarding();
  const [errors, setErrors] = useState({});

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      updateForm({ [field]: file });
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.idDocument) newErrors.idDocument = "ID document is required";
    if (!formData.proofOfAddress)
      newErrors.proofOfAddress = "Proof of address is required";
    if (
      formData.accountType === "business" &&
      formData.businessDocuments.length === 0
    )
      newErrors.businessDocuments = "Business documents are required";
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
      <h2 className="text-2xl font-bold mb-4">Verification</h2>
      <p className="text-sm text-gray-600 mb-4">
        Please upload the required documents. All documents must be clear and
        legible.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Government-issued ID (Passport/Driver's License) *
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e, "idDocument")}
            className="w-full"
          />
          {errors.idDocument && (
            <p className="text-xs text-red-500 mt-1">{errors.idDocument}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Proof of Address (Utility bill / Bank statement, within 3 months) *
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e, "proofOfAddress")}
            className="w-full"
          />
          {errors.proofOfAddress && (
            <p className="text-xs text-red-500 mt-1">{errors.proofOfAddress}</p>
          )}
        </div>

        {formData.accountType === "business" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Registration Certificate *
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  updateForm({ businessDocuments: [file] });
                  if (errors.businessDocuments)
                    setErrors((prev) => ({ ...prev, businessDocuments: "" }));
                }
              }}
              className="w-full"
            />
            {errors.businessDocuments && (
              <p className="text-xs text-red-500 mt-1">
                {errors.businessDocuments}
              </p>
            )}
          </div>
        )}
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
