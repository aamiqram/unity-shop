// components/onboarding/Step3.jsx
"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import { useState } from "react";
import Image from "next/image";

export default function Step3() {
  const { formData, updateForm, nextStep, prevStep } = useOnboarding();
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateForm({ [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      updateForm({ [field]: file });
      const reader = new FileReader();
      reader.onload = () => {
        if (field === "storeLogo") setLogoPreview(reader.result);
        else setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.storeName) newErrors.storeName = "Store name is required";
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
      <h2 className="text-2xl font-bold mb-4">Store Details</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Store Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.storeName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.storeName && (
            <p className="text-xs text-red-500 mt-1">{errors.storeName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Store Tagline
          </label>
          <input
            type="text"
            name="storeTagline"
            value={formData.storeTagline}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Store Logo
          </label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Logo"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  Logo
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "storeLogo")}
              className="text-sm"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Recommended: 200x200px</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Store Banner
          </label>
          <div className="mb-2">
            {bannerPreview ? (
              <Image
                src={bannerPreview}
                alt="Banner"
                width={400}
                height={100}
                className="object-cover rounded"
              />
            ) : (
              <div className="w-full h-20 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                Banner Preview
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "storeBanner")}
            className="text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">Recommended: 1200x300px</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Store Description
          </label>
          <textarea
            name="storeDescription"
            value={formData.storeDescription}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Store URL
          </label>
          <div className="flex items-center border border-gray-300 rounded overflow-hidden">
            <span className="bg-gray-100 px-3 py-2 text-sm text-gray-600">
              unityshop.com/store/
            </span>
            <input
              type="text"
              name="storeSlug"
              value={formData.storeSlug}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border-0 focus:outline-none"
              placeholder="your-store-name"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Auto-generated from store name if left blank
          </p>
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
