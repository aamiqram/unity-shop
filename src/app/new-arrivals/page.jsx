// app/new-arrivals/page.jsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCardB2B from "@/components/product/ProductCardB2B";
import { demoProducts } from "@/lib/demoProducts";
import { FiClock, FiCalendar, FiMail } from "react-icons/fi";

// Helper to add random creation dates (last 60 days)
const getRandomDate = (daysAgoMax = 60) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgoMax));
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
};

// Enhance products with createdAt date
const productsWithDate = demoProducts.map((product) => ({
  ...product,
  createdAt: product.createdAt || getRandomDate(60),
}));

// Sort by newest first
const sortedByNewest = [...productsWithDate].sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
);

export default function NewArrivalsPage() {
  const [timeFilter, setTimeFilter] = useState("all"); // all, 7days, 30days, month
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // grid, timeline

  // Filter products based on time
  const now = new Date();
  const filteredProducts = sortedByNewest.filter((product) => {
    const productDate = new Date(product.createdAt);
    const diffDays = Math.floor((now - productDate) / (1000 * 60 * 60 * 24));

    if (timeFilter === "7days" && diffDays > 7) return false;
    if (timeFilter === "30days" && diffDays > 30) return false;
    if (timeFilter === "month") {
      // current month
      if (
        productDate.getMonth() !== now.getMonth() ||
        productDate.getFullYear() !== now.getFullYear()
      )
        return false;
    }
    if (categoryFilter !== "All" && product.category !== categoryFilter)
      return false;
    return true;
  });

  // Group by date for timeline view
  const groupedByDate = filteredProducts.reduce((acc, product) => {
    const date = product.createdAt;
    if (!acc[date]) acc[date] = [];
    acc[date].push(product);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => new Date(b) - new Date(a),
  );

  // Stats
  const totalNew = filteredProducts.length;
  const newThisWeek = sortedByNewest.filter((p) => {
    const d = new Date(p.createdAt);
    return (now - d) / (1000 * 60 * 60 * 24) <= 7;
  }).length;

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#FF6600] to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Discover What's New
          </h1>
          <p className="text-xl mb-4">
            Fresh products added daily – be the first to see them!
          </p>
          <div className="inline-block bg-white bg-opacity-20 px-4 py-2 rounded-full">
            <FiCalendar className="inline mr-2" />
            <span className="font-semibold">
              {newThisWeek} new items this week
            </span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["all", "7days", "30days", "month"].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  timeFilter === filter
                    ? "bg-[#FF6600] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {filter === "all" && "All New Arrivals"}
                {filter === "7days" && "Last 7 Days"}
                {filter === "30days" && "Last 30 Days"}
                {filter === "month" && "This Month"}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded ${
                viewMode === "grid"
                  ? "bg-[#FF6600] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-3 py-1 rounded ${
                viewMode === "timeline"
                  ? "bg-[#FF6600] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Timeline
            </button>
          </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            "All",
            "Electronics",
            "Fashion",
            "Home & Garden",
            "Sports",
            "Beauty",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs border ${
                categoryFilter === cat
                  ? "bg-[#FF6600] text-white border-[#FF6600]"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort and count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <p className="text-sm text-gray-600 mb-2 sm:mb-0">
            <span className="font-semibold">{totalNew}</span> new products
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Products display */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No new products match your filters.</p>
            <button
              onClick={() => {
                setTimeFilter("all");
                setCategoryFilter("All");
              }}
              className="mt-2 text-[#FF6600] hover:underline"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          // Grid view
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filteredProducts.map((product) => {
              const daysAgo = Math.floor(
                (now - new Date(product.createdAt)) / (1000 * 60 * 60 * 24),
              );
              return (
                <div key={product.id} className="relative">
                  <div className="absolute top-2 left-2 z-10 bg-[#FF6600] text-white text-xs px-2 py-1 rounded-full">
                    NEW
                  </div>
                  <ProductCardB2B product={product} />
                  <p className="text-xs text-gray-400 mt-1">
                    Added{" "}
                    {daysAgo === 0
                      ? "today"
                      : `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          // Timeline view
          <div className="space-y-6">
            {sortedDates.map((date) => (
              <div key={date}>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <FiClock className="text-[#FF6600]" />
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {groupedByDate[date].map((product) => (
                    <div key={product.id}>
                      <ProductCardB2B product={product} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Email Alerts */}
        <div className="mt-10 bg-gray-100 rounded-lg p-6 text-center">
          <FiMail className="mx-auto text-[#FF6600] text-3xl mb-2" />
          <h2 className="text-xl font-semibold mb-2">
            Get notified of new arrivals
          </h2>
          <p className="text-gray-600 mb-4">
            Be the first to know when new products hit the market.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
              required
            />
            <button className="px-4 py-2 bg-[#FF6600] text-white rounded hover:bg-[#e65c00]">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-2">
            Choose frequency: Daily / Weekly / Monthly
          </p>
        </div>
      </div>
    </main>
  );
}
