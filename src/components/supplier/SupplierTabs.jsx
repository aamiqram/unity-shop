// components/supplier/SupplierTabs.jsx
"use client";

import { useState } from "react";
import SupplierProducts from "./SupplierProducts";
import SupplierAbout from "./SupplierAbout";
import SupplierReviews from "./SupplierReviews";
import SupplierContact from "./SupplierContact";

const SupplierTabs = ({ supplier }) => {
  const [activeTab, setActiveTab] = useState("products");

  const tabs = [
    { id: "products", label: "Products" },
    { id: "about", label: "About Company" },
    { id: "reviews", label: "Reviews & Ratings" },
    { id: "contact", label: "Contact Information" },
  ];

  return (
    <div>
      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-[#FF6600] text-[#FF6600]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div>
        {activeTab === "products" && <SupplierProducts supplier={supplier} />}
        {activeTab === "about" && <SupplierAbout supplier={supplier} />}
        {activeTab === "reviews" && <SupplierReviews supplier={supplier} />}
        {activeTab === "contact" && <SupplierContact supplier={supplier} />}
      </div>
    </div>
  );
};

export default SupplierTabs;
