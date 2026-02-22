// app/search/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiFilter, FiX } from "react-icons/fi";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import { demoProducts } from "@/lib/demoProducts";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  // State for filters, sorting, pagination, view mode
  const [filters, setFilters] = useState({
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

  const [sortBy, setSortBy] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const itemsPerPage = 20;

  // Apply filters and sorting whenever filters or sort changes
  useEffect(() => {
    let results = demoProducts.filter((product) => {
      // Search query filter (simple title match)
      if (query && !product.title.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      ) {
        return false;
      }

      // Price range
      if (filters.priceMin !== undefined && product.priceMin < filters.priceMin)
        return false;
      if (filters.priceMax !== undefined && product.priceMax > filters.priceMax)
        return false;

      // MOQ range
      if (filters.moqMin !== undefined && product.moq < filters.moqMin)
        return false;
      if (filters.moqMax !== undefined && product.moq > filters.moqMax)
        return false;

      // Supplier location
      if (
        filters.countries.length > 0 &&
        !filters.countries.includes(
          product.supplier.location.split(", ")[1] || product.supplier.location,
        )
      ) {
        // simplified: we assume country is the last part after comma, but for demo we'll just check if country string includes the filter
        const supplierCountry = product.supplier.location.includes(",")
          ? product.supplier.location.split(", ")[1]
          : product.supplier.location;
        if (!filters.countries.some((c) => supplierCountry.includes(c)))
          return false;
      }

      // Trade Assurance
      if (filters.tradeAssurance && !product.supplier.tradeAssurance)
        return false;

      // Verified Supplier
      if (filters.verified && !product.supplier.verified) return false;

      // Rating
      if (filters.rating !== null && (product.rating || 0) < filters.rating)
        return false;

      return true;
    });

    // Apply sorting
    if (sortBy === "price-asc") {
      results.sort((a, b) => a.priceMin - b.priceMin);
    } else if (sortBy === "price-desc") {
      results.sort((a, b) => b.priceMax - a.priceMax);
    } else if (sortBy === "newest") {
      // dummy: sort by id descending (assuming higher id = newer)
      results.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    } else {
      // recommended: default order (keep as is)
    }

    setFilteredProducts(results);
    setCurrentPage(1); // reset to first page when filters change
  }, [query, filters, sortBy]);

  // Paginate
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm mb-4">
          <ol className="flex items-center space-x-2 text-gray-500">
            <li>
              <Link href="/" className="hover:text-[#FF6600]">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>Search</li>
            {query && (
              <>
                <li>/</li>
                <li className="text-gray-800">"{query}"</li>
              </>
            )}
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters - desktop */}
          <div className="hidden lg:block lg:w-72 flex-shrink-0">
            <SearchFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Mobile filter button and drawer */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md"
            >
              <FiFilter />
              Filters
            </button>
          </div>

          {/* Mobile filter drawer */}
          {showMobileFilters && (
            <div
              className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-4/5 max-w-sm bg-white overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <SearchFilters
                  filters={filters}
                  setFilters={setFilters}
                  isMobile
                  onClose={() => setShowMobileFilters(false)}
                />
              </div>
            </div>
          )}

          {/* Main content */}
          <div className="flex-1">
            <SearchResults
              products={paginatedProducts}
              totalCount={filteredProducts.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
