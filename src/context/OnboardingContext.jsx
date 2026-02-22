// context/OnboardingContext.jsx
"use client";

import { createContext, useContext, useState } from "react";

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    accountType: "",
    // Step 2
    companyName: "",
    businessType: "",
    registrationNumber: "",
    taxId: "",
    businessEmail: "",
    businessPhone: "",
    // Step 3
    storeName: "",
    storeTagline: "",
    storeDescription: "",
    storeLogo: null,
    storeBanner: null,
    storeSlug: "",
    // Step 4
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "USA",
    sameWarehouse: true,
    warehouseAddress: {},
    // Step 5
    categories: [],
    monthlySalesVolume: "",
    initialProducts: "",
    productUploadMethod: "manual",
    // Step 6
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    routingNumber: "",
    swiftCode: "",
    payoutSchedule: "weekly",
    acceptedPayments: {
      cards: true,
      paypal: true,
      bank: false,
    },
    // Step 7
    idDocument: null,
    proofOfAddress: null,
    businessDocuments: [],
  });

  const updateForm = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 8));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const goToStep = (s) => setStep(s);

  return (
    <OnboardingContext.Provider
      value={{
        step,
        formData,
        updateForm,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => useContext(OnboardingContext);
