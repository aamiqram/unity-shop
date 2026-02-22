// components/onboarding/Step1.jsx
"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import { FiUser, FiBriefcase } from "react-icons/fi";

export default function Step1() {
  const { formData, updateForm, nextStep } = useOnboarding();

  const handleSelect = (type) => {
    updateForm({ accountType: type });
  };

  const handleContinue = () => {
    if (formData.accountType) nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Become a Seller</h2>
      <p className="text-gray-600 mb-6">
        Choose your account type to get started.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div
          onClick={() => handleSelect("individual")}
          className={`border rounded-lg p-6 cursor-pointer transition ${
            formData.accountType === "individual"
              ? "border-[#FF6600] bg-orange-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <FiUser className="text-3xl text-[#FF6600] mb-3" />
          <h3 className="font-semibold text-lg mb-2">Individual Seller</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ For small businesses and individuals</li>
            <li>✓ Simple setup</li>
            <li>✓ No registration required</li>
          </ul>
        </div>

        <div
          onClick={() => handleSelect("business")}
          className={`border rounded-lg p-6 cursor-pointer transition ${
            formData.accountType === "business"
              ? "border-[#FF6600] bg-orange-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <FiBriefcase className="text-3xl text-[#FF6600] mb-3" />
          <h3 className="font-semibold text-lg mb-2">Business/Company</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ For registered businesses</li>
            <li>✓ Company profile</li>
            <li>✓ Higher trust level</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!formData.accountType}
          className="px-6 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00] disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
