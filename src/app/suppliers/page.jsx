// app/suppliers/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { demoSuppliers } from "@/lib/demoSuppliers";
import {
  FiSearch,
  FiMapPin,
  FiStar,
  FiCheckCircle,
  FiAward,
  FiMessageSquare,
  FiEye,
  FiGrid,
  FiMap,
} from "react-icons/fi";

// Extract unique countries and categories for filters
const countries = [
  ...new Set(
    demoSuppliers.map((s) => s.location.split(",")[1]?.trim() || s.location),
  ),
];
const allCategories = [
  ...new Set(demoSuppliers.flatMap((s) => s.mainCategories)),
];

export default function SuppliersDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [tradeAssuranceOnly, setTradeAssuranceOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [yearsMin, setYearsMin] = useState(0);
  const [viewMode, setViewMode] = useState("grid"); // grid, map
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter suppliers
  const filteredSuppliers = demoSuppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry =
      !selectedCountry || supplier.location.includes(selectedCountry);
    const matchesCategory =
      !selectedCategory || supplier.mainCategories.includes(selectedCategory);
    const matchesVerified = !verifiedOnly || supplier.verified;
    const matchesTrade = !tradeAssuranceOnly || supplier.tradeAssurance;
    const matchesRating = supplier.rating >= minRating;
    const matchesYears = supplier.yearsInBusiness >= yearsMin;
    return (
      matchesSearch &&
      matchesCountry &&
      matchesCategory &&
      matchesVerified &&
      matchesTrade &&
      matchesRating &&
      matchesYears
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const paginatedSuppliers = filteredSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Featured suppliers (top 3 by rating or premium)
  const featuredSuppliers = demoSuppliers.filter((s) => s.premium).slice(0, 3);

  return (
    <main className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Find Verified Suppliers
          </h1>
          <p className="text-gray-600">
            Connect with trusted manufacturers and suppliers worldwide
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by supplier name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
            />
          </div>
        </div>

        {/* View toggle */}
        <div className="flex justify-end mb-4">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-[#FF6600] text-white" : "bg-white text-gray-600"}`}
            >
              <FiGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`p-2 ${viewMode === "map" ? "bg-[#FF6600] text-white" : "bg-white text-gray-600"}`}
            >
              <FiMap size={18} />
            </button>
          </div>
        </div>

        {/* Map view placeholder (if selected) */}
        {viewMode === "map" && (
          <div className="bg-gray-200 h-96 rounded-lg mb-6 flex items-center justify-center text-gray-500">
            Map view coming soon – suppliers would be plotted here.
          </div>
        )}

        {/* Featured suppliers */}
        {featuredSuppliers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Featured Suppliers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredSuppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3 shadow-sm"
                >
                  <div className="w-16 h-16 relative rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={supplier.logo}
                      alt={supplier.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{supplier.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FiMapPin size={12} /> {supplier.location}
                    </p>
                    <div className="flex items-center gap-1 text-yellow-500 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          size={12}
                          fill={
                            i < Math.round(supplier.rating)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">
                        {supplier.rating}
                      </span>
                    </div>
                    <Link
                      href={`/suppliers/${supplier.id}`}
                      className="text-xs text-[#FF6600] mt-1 inline-block"
                    >
                      View Profile →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main content: filters and grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar */}
          <aside className="lg:w-72 space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-3">Filter Suppliers</h3>

              {/* Country */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Country/Region
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="">All Countries</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="">All Categories</option>
                  {allCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Verification checkboxes */}
              <div className="mb-4 space-y-2">
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="mr-2"
                  />
                  Verified Supplier
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={tradeAssuranceOnly}
                    onChange={(e) => setTradeAssuranceOnly(e.target.checked)}
                    className="mr-2"
                  />
                  Trade Assurance
                </label>
              </div>

              {/* Rating */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Min. Rating
                </label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="0">Any</option>
                  <option value="4">4★ & up</option>
                  <option value="4.5">4.5★ & up</option>
                </select>
              </div>

              {/* Years in business */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Years in Business
                </label>
                <select
                  value={yearsMin}
                  onChange={(e) => setYearsMin(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="0">Any</option>
                  <option value="3">3+ years</option>
                  <option value="5">5+ years</option>
                  <option value="10">10+ years</option>
                </select>
              </div>

              {/* Clear filters */}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCountry("");
                  setSelectedCategory("");
                  setVerifiedOnly(false);
                  setTradeAssuranceOnly(false);
                  setMinRating(0);
                  setYearsMin(0);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Suppliers grid */}
          <div className="flex-1">
            {/* Results count */}
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-semibold">{filteredSuppliers.length}</span>{" "}
              suppliers found
            </p>

            {/* Supplier cards */}
            {paginatedSuppliers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500">
                  No suppliers match your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginatedSuppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 relative rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={supplier.logo}
                          alt={supplier.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Link
                          href={`/suppliers/${supplier.id}`}
                          className="font-semibold hover:text-[#FF6600]"
                        >
                          {supplier.name}
                        </Link>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <FiMapPin size={12} /> {supplier.location}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              size={12}
                              fill={
                                i < Math.round(supplier.rating)
                                  ? "currentColor"
                                  : "none"
                              }
                              className="text-yellow-500"
                            />
                          ))}
                          <span className="text-xs text-gray-600 ml-1">
                            {supplier.rating} ({supplier.reviewCount})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {supplier.verified && (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                          <FiCheckCircle size={10} /> Verified
                        </span>
                      )}
                      {supplier.tradeAssurance && (
                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                          <FiAward size={10} /> Trade Assurance
                        </span>
                      )}
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                        {supplier.yearsInBusiness}+ yrs
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
                      <div>
                        <p className="font-medium">{supplier.productCount}</p>
                        <p className="text-gray-500">Products</p>
                      </div>
                      <div>
                        <p className="font-medium">{supplier.responseRate}%</p>
                        <p className="text-gray-500">Response</p>
                      </div>
                      <div>
                        <p className="font-medium">{supplier.responseTime}</p>
                        <p className="text-gray-500">Response Time</p>
                      </div>
                    </div>

                    {/* Categories chips */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {supplier.mainCategories.slice(0, 3).map((cat) => (
                        <span
                          key={cat}
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-3">
                      <Link
                        href={`/suppliers/${supplier.id}`}
                        className="flex-1 border border-gray-300 text-gray-700 text-sm py-1.5 rounded flex items-center justify-center gap-1 hover:bg-gray-50"
                      >
                        <FiEye size={14} /> View
                      </Link>
                      <button className="flex-1 bg-[#FF6600] text-white text-sm py-1.5 rounded flex items-center justify-center gap-1 hover:bg-[#e65c00]">
                        <FiMessageSquare size={14} /> Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 border rounded ${
                          page === currentPage
                            ? "bg-[#FF6600] text-white border-[#FF6600]"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* Stats (optional) */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded border border-gray-200 text-center">
            <p className="text-2xl font-bold text-[#FF6600]">
              {demoSuppliers.length}
            </p>
            <p className="text-xs text-gray-500">Total Suppliers</p>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200 text-center">
            <p className="text-2xl font-bold text-[#FF6600]">
              {demoSuppliers.filter((s) => s.verified).length}
            </p>
            <p className="text-xs text-gray-500">Verified</p>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200 text-center">
            <p className="text-2xl font-bold text-[#FF6600]">
              {demoSuppliers.filter((s) => s.tradeAssurance).length}
            </p>
            <p className="text-xs text-gray-500">Trade Assurance</p>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200 text-center">
            <p className="text-2xl font-bold text-[#FF6600]">12</p>
            <p className="text-xs text-gray-500">Countries</p>
          </div>
        </div>
      </div>
    </main>
  );
}
