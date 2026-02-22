// components/search/SearchFilters.jsx
"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";

const SearchFilters = ({ filters, setFilters, onClose, isMobile }) => {
  const [priceMin, setPriceMin] = useState(filters.priceMin || "");
  const [priceMax, setPriceMax] = useState(filters.priceMax || "");
  const [moqMin, setMoqMin] = useState(filters.moqMin || "");
  const [moqMax, setMoqMax] = useState(filters.moqMax || "");

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Health & Beauty",
    "Sports & Outdoors",
    "Toys & Kids",
    "Automotive",
    "Office Supplies",
  ];

  const countries = [
    "China",
    "India",
    "Vietnam",
    "USA",
    "Germany",
    "Japan",
    "South Korea",
  ];

  const handleApply = () => {
    setFilters({
      ...filters,
      priceMin: priceMin ? Number(priceMin) : undefined,
      priceMax: priceMax ? Number(priceMax) : undefined,
      moqMin: moqMin ? Number(moqMin) : undefined,
      moqMax: moqMax ? Number(moqMax) : undefined,
    });
    if (isMobile && onClose) onClose();
  };

  const handleClearAll = () => {
    setPriceMin("");
    setPriceMax("");
    setMoqMin("");
    setMoqMax("");
    setFilters({
      categories: [],
      priceMin: undefined,
      priceMax: undefined,
      moqMin: undefined,
      moqMax: undefined,
      countries: [],
      tradeAssurance: false,
      verified: false,
      rating: null,
    });
    if (isMobile && onClose) onClose();
  };

  const handleCategoryChange = (category) => {
    const current = filters.categories || [];
    const updated = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    setFilters({ ...filters, categories: updated });
  };

  const handleCountryChange = (country) => {
    const current = filters.countries || [];
    const updated = current.includes(country)
      ? current.filter((c) => c !== country)
      : [...current, country];
    setFilters({ ...filters, countries: updated });
  };

  const handleRatingChange = (rating) => {
    setFilters({
      ...filters,
      rating: rating === filters.rating ? null : rating,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 sticky top-24">
      {/* Header with close button for mobile */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Filters</h3>
        {isMobile && (
          <button onClick={onClose} className="p-1">
            <FiX size={20} />
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={(filters.categories || []).includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2 rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Price Range ($)
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            min="0"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            min="0"
          />
        </div>
      </div>

      {/* MOQ range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">MOQ (pieces)</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={moqMin}
            onChange={(e) => setMoqMin(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            min="0"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={moqMax}
            onChange={(e) => setMoqMax(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            min="0"
          />
        </div>
      </div>

      {/* Supplier location */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Supplier Location
        </h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {countries.map((country) => (
            <label key={country} className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={(filters.countries || []).includes(country)}
                onChange={() => handleCountryChange(country)}
                className="mr-2 rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
              />
              {country}
            </label>
          ))}
        </div>
      </div>

      {/* Trade Assurance toggle */}
      <div className="mb-4">
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={filters.tradeAssurance || false}
            onChange={(e) =>
              setFilters({ ...filters, tradeAssurance: e.target.checked })
            }
            className="mr-2 rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
          />
          Trade Assurance
        </label>
      </div>

      {/* Verified Supplier toggle */}
      <div className="mb-4">
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={filters.verified || false}
            onChange={(e) =>
              setFilters({ ...filters, verified: e.target.checked })
            }
            className="mr-2 rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
          />
          Verified Supplier
        </label>
      </div>

      {/* Rating filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <label key={star} className="flex items-center text-sm">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === star}
                onChange={() => handleRatingChange(star)}
                className="mr-2 border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
              />
              {star} stars & up
            </label>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleApply}
          className="flex-1 bg-[#FF6600] text-white py-2 rounded-md text-sm hover:bg-[#e65c00]"
        >
          Apply
        </button>
        <button
          onClick={handleClearAll}
          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md text-sm hover:bg-gray-50"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
