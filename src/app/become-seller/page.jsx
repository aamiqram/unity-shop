// app/become-seller/page.jsx
"use client";

import { OnboardingProvider, useOnboarding } from "@/context/OnboardingContext";
import Step1 from "@/components/onboarding/Step1";
import Step2 from "@/components/onboarding/Step2";
import Step3 from "@/components/onboarding/Step3";
import Step4 from "@/components/onboarding/Step4";
import Step5 from "@/components/onboarding/Step5";
import Step6 from "@/components/onboarding/Step6";
import Step7 from "@/components/onboarding/Step7";
import Step8 from "@/components/onboarding/Step8";
import Success from "@/components/onboarding/Success";

const steps = [
  "Account Type",
  "Business Info",
  "Store Details",
  "Contact & Address",
  "Categories",
  "Payment",
  "Verification",
  "Review",
];

function WizardContent() {
  const { step } = useOnboarding();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      case 6:
        return <Step6 />;
      case 7:
        return <Step7 />;
      case 8:
        return <Step8 />;
      default:
        return <Success />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((label, i) => (
              <div key={i} className="text-xs text-gray-500 w-20 text-center">
                {label}
              </div>
            ))}
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${(step / 8) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#FF6600] transition-all duration-300"
              />
            </div>
          </div>
          <div className="text-right text-sm mt-1">Step {step} of 8</div>
        </div>

        {/* Step content */}
        <div className="bg-white p-6 rounded-lg shadow-md">{renderStep()}</div>
      </div>
    </div>
  );
}

export default function BecomeSellerPage() {
  return (
    <OnboardingProvider>
      <WizardContent />
    </OnboardingProvider>
  );
}
