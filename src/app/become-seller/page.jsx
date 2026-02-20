"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, name: "Account Type" },
  { id: 2, name: "Business Info" },
  { id: 3, name: "Store Details" },
  { id: 4, name: "Verification" },
];

export default function BecomeSellerPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    // In a real app, submit data to API
    router.push("/dashboard/seller?onboarding=complete");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-8">Become a Seller</h1>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`text-sm ${s.id === currentStep ? "font-bold text-orange" : "text-gray-500"}`}
            >
              {s.name}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div
            className="bg-orange h-2 rounded"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white p-6 rounded-lg border">
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Choose Account Type</h2>
            <div className="space-y-3">
              <label className="block border p-4 rounded-lg cursor-pointer hover:border-orange">
                <input
                  type="radio"
                  name="type"
                  value="individual"
                  className="mr-2 accent-orange"
                />{" "}
                Individual Seller
                <p className="text-sm text-gray-500 ml-6">
                  For individuals and small businesses
                </p>
              </label>
              <label className="block border p-4 rounded-lg cursor-pointer hover:border-orange">
                <input
                  type="radio"
                  name="type"
                  value="company"
                  className="mr-2 accent-orange"
                />{" "}
                Company / Business
                <p className="text-sm text-gray-500 ml-6">
                  For registered companies
                </p>
              </label>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Business Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Business Name *
                </label>
                <input type="text" className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Business Type
                </label>
                <select className="w-full border p-2 rounded">
                  <option>Sole Proprietorship</option>
                  <option>Partnership</option>
                  <option>Corporation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tax ID / VAT Number
                </label>
                <input type="text" className="w-full border p-2 rounded" />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Store Details</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Store Name *
                </label>
                <input type="text" className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Store Description
                </label>
                <textarea
                  rows="4"
                  className="w-full border p-2 rounded"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Store Logo
                </label>
                <input type="file" className="w-full" />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Verification</h2>
            <p className="text-sm text-gray-500 mb-4">
              Please upload the following documents for verification.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Government ID (Passport/Driver's License) *
                </label>
                <input type="file" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Proof of Address (Utility bill/Bank statement) *
                </label>
                <input type="file" className="w-full" />
              </div>
              {/* company only */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Business Registration Certificate
                </label>
                <input type="file" className="w-full" />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border px-6 py-2 rounded-lg disabled:opacity-50"
          >
            Back
          </button>
          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              className="bg-orange text-white px-6 py-2 rounded-lg"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-orange text-white px-6 py-2 rounded-lg"
            >
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
