// components/search/SearchResults.jsx
"use client";

import { useState } from "react";
import ProductCardB2B from "../product/ProductCardB2B";
import { FiGrid, FiList, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SearchResults = ({
  products,
  totalCount,
  currentPage,
  setCurrentPage,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  itemsPerPage = 20,
}) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Results header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <p className="text-gray-600 mb-2 sm:mb-0">
          <span className="font-semibold">{totalCount}</span> products found
        </p>
        <div className="flex items-center gap-2">
          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>

          {/* View toggle */}
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-[#FF6600] text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
              aria-label="Grid view"
            >
              <FiGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-[#FF6600] text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
              aria-label="List view"
            >
              <FiList size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Active filters chips (optional – can be passed from parent) */}

      {/* Product grid/list */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products match your filters.</p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
              : "space-y-4"
          }
        >
          {products.map((product) => (
            <div key={product.id} className={viewMode === "list" ? "flex" : ""}>
              {viewMode === "list" ? (
                // Simple list view – you can create a separate list card component for better layout
                <div className="flex w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="w-32 h-32 relative flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">
                      {product.title}
                    </h3>
                    <div className="text-sm text-gray-600 mb-2">
                      ${product.priceMin} - ${product.priceMax} / piece
                    </div>
                    <div className="text-xs text-gray-500">
                      MOQ: {product.moq} pieces
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {product.supplier.name} · {product.supplier.location}
                    </div>
                  </div>
                </div>
              ) : (
                <ProductCardB2B product={product} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <FiChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-md ${
                  page === currentPage
                    ? "bg-[#FF6600] text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <FiChevronRight size={18} />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
