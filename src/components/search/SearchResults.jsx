"use client";

import { useState } from "react";
import ProductCardB2B from "../product/ProductCardB2B";
import { FiGrid, FiList } from "react-icons/fi";

// Demo results (reuse from ProductGrid or generate more)
const demoResults = [
  // ... similar to ProductGrid demoProducts, maybe 20 items
];

export default function SearchResults({ keyword }) {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("recommended");

  return (
    <div>
      {/* Top bar: results count, sort, view toggle */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className="text-gray-600">
          <span className="font-bold">1,234</span> products found for "{keyword}
          "
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
          <div className="flex border rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              <FiGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              <FiList size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Active filters chips (placeholder) */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center">
          Electronics <button className="ml-2 text-gray-500">×</button>
        </span>
        <span className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center">
          Price $10 - $100 <button className="ml-2 text-gray-500">×</button>
        </span>
      </div>

      {/* Product grid */}
      <div
        className={`grid gap-4 ${
          viewMode === "grid"
            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "grid-cols-1"
        }`}
      >
        {demoResults.map((product) => (
          <ProductCardB2B key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <nav className="flex space-x-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            Prev
          </button>
          <button className="px-3 py-1 border rounded bg-orange-500 text-white">
            1
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            2
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            3
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
