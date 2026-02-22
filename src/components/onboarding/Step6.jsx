// components/onboarding/Step6.jsx
"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import { useState } from "react";

export default function Step6() {
  const { formData, updateForm, nextStep, prevStep } = useOnboarding();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateForm({ [name]: type === "checkbox" ? checked : value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.bankName) newErrors.bankName = "Bank name is required";
    if (!formData.accountHolder)
      newErrors.accountHolder = "Account holder name is required";
    if (!formData.accountNumber)
      newErrors.accountNumber = "Account number is required";
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
      <h2 className="text-2xl font-bold mb-4">Payment & Banking</h2>

      <div className="space-y-4">
        <h3 className="font-semibold">Bank Account Information</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bank Name *
          </label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.bankName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.bankName && (
            <p className="text-xs text-red-500 mt-1">{errors.bankName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Holder Name *
          </label>
          <input
            type="text"
            name="accountHolder"
            value={formData.accountHolder}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.accountHolder ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.accountHolder && (
            <p className="text-xs text-red-500 mt-1">{errors.accountHolder}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Number *
          </label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.accountNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.accountNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.accountNumber}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Routing Number
            </label>
            <input
              type="text"
              name="routingNumber"
              value={formData.routingNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SWIFT/BIC (international)
            </label>
            <input
              type="text"
              name="swiftCode"
              value={formData.swiftCode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payout Schedule
          </label>
          <select
            name="payoutSchedule"
            value={formData.payoutSchedule}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <h3 className="font-semibold mt-4">Accepted Payment Methods</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="acceptedPayments.cards"
              checked={formData.acceptedPayments.cards}
              onChange={(e) =>
                updateForm({
                  acceptedPayments: {
                    ...formData.acceptedPayments,
                    cards: e.target.checked,
                  },
                })
              }
              className="mr-2"
            />
            Credit/Debit cards
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="acceptedPayments.paypal"
              checked={formData.acceptedPayments.paypal}
              onChange={(e) =>
                updateForm({
                  acceptedPayments: {
                    ...formData.acceptedPayments,
                    paypal: e.target.checked,
                  },
                })
              }
              className="mr-2"
            />
            PayPal
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="acceptedPayments.bank"
              checked={formData.acceptedPayments.bank}
              onChange={(e) =>
                updateForm({
                  acceptedPayments: {
                    ...formData.acceptedPayments,
                    bank: e.target.checked,
                  },
                })
              }
              className="mr-2"
            />
            Bank transfer
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
