// app/products/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCardB2B from "@/components/product/ProductCardB2B";
import { demoProducts } from "@/lib/demoProducts";
import { FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Health & Beauty",
  "Sports & Outdoors",
  "Toys & Kids",
  "Automotive",
  "Office Supplies",
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [sortBy, setSortBy] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const itemsPerPage = 20;

  useEffect(() => {
    let results = demoProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== "All" && product.category !== selectedCategory)
        return false;
      // Price filter
      if (
        product.priceMin < priceRange.min ||
        product.priceMax > priceRange.max
      )
        return false;
      return true;
    });

    // Sorting
    if (sortBy === "price-asc") {
      results.sort((a, b) => a.priceMin - b.priceMin);
    } else if (sortBy === "price-desc") {
      results.sort((a, b) => b.priceMax - a.priceMax);
    } else if (sortBy === "newest") {
      results.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    } // else "recommended" keeps original order

    setFilteredProducts(results);
    setCurrentPage(1);
  }, [selectedCategory, priceRange, sortBy]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm mb-4">
          <ol className="flex items-center space-x-2 text-gray-500">
            <li>
              <Link href="/" className="hover:text-[#FF6600]">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800">All Products</li>
          </ol>
        </nav>

        <h1 className="text-2xl md:text-3xl font-bold mb-6">All Products</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar */}
          <aside className="lg:w-72 space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-3 flex items-center gap-1">
                <FiFilter /> Filters
              </h3>

              {/* Category filter */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Category</h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="mr-2"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <h4 className="text-sm font-medium mb-2">Price Range ($)</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        min: Number(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    min="0"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: Number(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Sort and results count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <p className="text-gray-600 mb-2 sm:mb-0">
                <span className="font-semibold">{filteredProducts.length}</span>{" "}
                products found
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Product grid */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500">No products match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCardB2B key={product.id} product={product} />
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
                    className="p-2 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
                  >
                    <FiChevronLeft size={18} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded ${
                          page === currentPage
                            ? "bg-[#FF6600] text-white"
                            : "border border-gray-300 hover:bg-gray-50"
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
                    className="p-2 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
                  >
                    <FiChevronRight size={18} />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
