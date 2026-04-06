// app/best-sellers/page.jsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCardB2B from "@/components/product/ProductCardB2B";
import { demoProducts } from "@/lib/demoProducts";
import { FiTrendingUp, FiAward, FiStar } from "react-icons/fi";

// Add random sales data to products
const productsWithSales = demoProducts.map((product, index) => ({
  ...product,
  sales: Math.floor(Math.random() * 1000) + 50, // random sales between 50 and 1050
  salesTrend: Math.random() > 0.5 ? "up" : "down", // trending up or down
}));

// Sort by sales descending to get best sellers
const allBestSellers = [...productsWithSales].sort((a, b) => b.sales - a.sales);

export default function BestSellersPage() {
  const [timeframe, setTimeframe] = useState("month"); // week, month, year, all
  const [category, setCategory] = useState("All");

  // Filter by category
  const filteredProducts = allBestSellers.filter(
    (p) => category === "All" || p.category === category,
  );

  // Top 10 for special display
  const top10 = filteredProducts.slice(0, 10);
  const rest = filteredProducts.slice(10);

  // Stats
  const totalSold = filteredProducts.reduce((acc, p) => acc + p.sales, 0);
  const topCategory = [...filteredProducts].sort((a, b) => b.sales - a.sales)[0]
    ?.category;
  const fastestSelling = [...filteredProducts].sort(
    (a, b) => b.sales / (b.moq || 1) - a.sales / (a.moq || 1),
  )[0];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#FF6600] to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Best Sellers</h1>
          <p className="text-xl mb-4">
            Most popular products loved by our customers
          </p>
          <FiAward className="inline text-3xl" />
        </div>
      </section>

      <div className="container mx-auto px-4 py-6">
        {/* Timeframe selector */}
        <div className="flex justify-center gap-2 mb-6">
          {["week", "month", "year", "all"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                timeframe === tf
                  ? "bg-[#FF6600] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tf === "all" ? "All Time" : `This ${tf}`}
            </button>
          ))}
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
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
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs border ${
                category === cat
                  ? "bg-[#FF6600] text-white border-[#FF6600]"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500">Total Sold (this period)</p>
            <p className="text-xl font-bold">{totalSold.toLocaleString()}</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500">Most Popular Category</p>
            <p className="text-xl font-bold">{topCategory}</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500">Fastest Selling</p>
            <p className="text-sm font-medium truncate">
              {fastestSelling?.title}
            </p>
          </div>
        </div>

        {/* Top 10 Leaderboard */}
        {top10.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FiTrendingUp className="text-[#FF6600]" /> Top 10 Best Sellers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {top10.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg p-3 flex items-start gap-3 hover:shadow-md transition"
                >
                  <div className="flex-shrink-0 w-12 text-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0
                          ? "bg-yellow-500"
                          : index === 1
                            ? "bg-gray-400"
                            : index === 2
                              ? "bg-orange-600"
                              : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      #{index + 1}
                    </div>
                  </div>
                  <div className="w-16 h-16 relative">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/products/${product.id}/${product.slug}`}
                      className="font-medium hover:text-[#FF6600]"
                    >
                      {product.title}
                    </Link>
                    <p className="text-sm text-gray-600">${product.priceMin}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>{product.sales} sold</span>
                      {product.salesTrend === "up" ? (
                        <span className="text-green-600">↑ trending</span>
                      ) : (
                        <span className="text-red-600">↓</span>
                      )}
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-[#FF6600] text-white rounded text-sm">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rest of best sellers (ranked #11+) */}
        {rest.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">More Best Sellers</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {rest.map((product, index) => (
                <div key={product.id} className="relative">
                  <div className="absolute top-2 left-2 z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                    #{index + 11}
                  </div>
                  <ProductCardB2B product={product} />
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                    <span>{product.sales} sold</span>
                    {product.salesTrend === "up" ? (
                      <span className="text-green-600">↑</span>
                    ) : (
                      <span className="text-red-600">↓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Personalized section (placeholder) */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-800">
            Popular in your country (based on your location)
          </p>
          <p className="text-xs text-blue-600 mt-1">United States</p>
        </div>
      </div>
    </main>
  );
}
