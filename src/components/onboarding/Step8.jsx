// components/onboarding/Step8.jsx
"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Step8() {
  const { formData, prevStep, goToStep } = useOnboarding();
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (!agreed) return;
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      router.push("/become-seller/success");
    }, 2000);
  };

  const Section = ({ title, children, step }) => (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{title}</h3>
        <button
          onClick={() => goToStep(step)}
          className="text-xs text-[#FF6600] hover:underline"
        >
          Edit
        </button>
      </div>
      <div className="text-sm text-gray-700 space-y-1">{children}</div>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Review & Submit</h2>

      <Section title="Account Type" step={1}>
        <p>
          Type:{" "}
          {formData.accountType === "individual" ? "Individual" : "Business"}
        </p>
      </Section>

      <Section title="Business Information" step={2}>
        <p>Company: {formData.companyName}</p>
        <p>Business Type: {formData.businessType}</p>
        <p>Email: {formData.businessEmail}</p>
        <p>Phone: {formData.businessPhone}</p>
      </Section>

      <Section title="Store Details" step={3}>
        <p>Store Name: {formData.storeName}</p>
        <p>Tagline: {formData.storeTagline || "—"}</p>
        <p>
          URL: unityshop.com/store/
          {formData.storeSlug ||
            formData.storeName.toLowerCase().replace(/\s+/g, "-")}
        </p>
      </Section>

      <Section title="Contact & Address" step={4}>
        <p>{formData.contactName}</p>
        <p>{formData.contactPhone}</p>
        <p>{formData.contactEmail}</p>
        <p>
          {formData.addressLine1}
          {formData.addressLine2 && `, ${formData.addressLine2}`}
        </p>
        <p>
          {formData.city}, {formData.state} {formData.zip}, {formData.country}
        </p>
      </Section>

      <Section title="Categories" step={5}>
        <p>{formData.categories.join(", ")}</p>
      </Section>

      <Section title="Payment" step={6}>
        <p>Bank: {formData.bankName}</p>
        <p>Account Holder: {formData.accountHolder}</p>
        <p>Account: ****{formData.accountNumber?.slice(-4)}</p>
        <p>Payout: {formData.payoutSchedule}</p>
      </Section>

      <Section title="Verification" step={7}>
        <p>ID Document: {formData.idDocument?.name || "Uploaded"}</p>
        <p>Proof of Address: {formData.proofOfAddress?.name || "Uploaded"}</p>
        {formData.accountType === "business" && (
          <p>Business Documents: Uploaded</p>
        )}
      </Section>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="font-semibold mb-2">Seller Agreement</h3>
        <div className="bg-gray-50 p-3 rounded text-xs h-40 overflow-y-auto mb-3">
          <p className="font-medium">Terms and Conditions</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="mt-2">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p className="mt-2">Commission structure:</p>
          <ul className="list-disc ml-4">
            <li>Standard rate: 8%</li>
            <li>Payment processing fee: 2.9% + $0.30</li>
          </ul>
        </div>
        <label className="flex items-start text-sm">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 mr-2"
          />
          <span>I agree to the Seller Terms and Conditions</span>
        </label>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!agreed || submitting}
          className="px-6 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00] disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
