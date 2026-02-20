"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function SearchFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [moqRange, setMoqRange] = useState([0, 10000]);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    moq: true,
    location: true,
    other: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="bg-white border rounded-lg p-4 sticky top-24">
      <h2 className="font-bold text-lg mb-4">Filters</h2>

      {/* Category */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("category")}
          className="flex justify-between items-center w-full text-left font-medium mb-2"
        >
          Category
          {expandedSections.category ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Electronics
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Fashion
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Home & Garden
            </label>
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("price")}
          className="flex justify-between items-center w-full text-left font-medium mb-2"
        >
          Price Range
          {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {expandedSections.price && (
          <div>
            <div className="flex space-x-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([+e.target.value, priceRange[1]])
                }
                className="w-full border rounded px-2 py-1"
                placeholder="Min"
              />
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], +e.target.value])
                }
                className="w-full border rounded px-2 py-1"
                placeholder="Max"
              />
            </div>
          </div>
        )}
      </div>

      {/* MOQ */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("moq")}
          className="flex justify-between items-center w-full text-left font-medium mb-2"
        >
          Minimum Order Quantity
          {expandedSections.moq ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {expandedSections.moq && (
          <div className="flex space-x-2">
            <input
              type="number"
              value={moqRange[0]}
              onChange={(e) => setMoqRange([+e.target.value, moqRange[1]])}
              className="w-full border rounded px-2 py-1"
              placeholder="Min"
            />
            <input
              type="number"
              value={moqRange[1]}
              onChange={(e) => setMoqRange([moqRange[0], +e.target.value])}
              className="w-full border rounded px-2 py-1"
              placeholder="Max"
            />
          </div>
        )}
      </div>

      {/* Supplier Location */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("location")}
          className="flex justify-between items-center w-full text-left font-medium mb-2"
        >
          Supplier Location
          {expandedSections.location ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {expandedSections.location && (
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> China
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> India
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Vietnam
            </label>
          </div>
        )}
      </div>

      {/* Other toggles */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("other")}
          className="flex justify-between items-center w-full text-left font-medium mb-2"
        >
          Supplier Services
          {expandedSections.other ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {expandedSections.other && (
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Trade Assurance
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Verified Supplier
            </label>
          </div>
        )}
      </div>

      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded">
        Apply Filters
      </button>
      <button className="w-full text-gray-500 hover:text-gray-700 text-sm mt-2">
        Clear All Filters
      </button>
    </div>
  );
}
