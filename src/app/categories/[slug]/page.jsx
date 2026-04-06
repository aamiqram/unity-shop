// app/categories/[slug]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductCardB2B from "@/components/product/ProductCardB2B";
import { demoProducts } from "@/lib/demoProducts";
import { getCategoryBySlug } from "@/lib/categories";
import { FiFilter, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

export default function CategoryPage({ params }) {
  const { slug } = params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  // State for filters and sorting
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [sortBy, setSortBy] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const itemsPerPage = 20;

  // Filter products by category and other filters
  useEffect(() => {
    let results = demoProducts.filter((product) => {
      // Category filter
      if (product.category !== category.name) return false;
      // Price filter
      if (
        product.priceMin < priceRange.min ||
        product.priceMax > priceRange.max
      )
        return false;
      // Brand filter (if any)
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand))
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
  }, [category, priceRange, selectedBrands, sortBy]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const clearAllFilters = () => {
    setPriceRange({ min: 0, max: 500 });
    setSelectedBrands([]);
  };

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
            <li>
              <Link href="/categories" className="hover:text-[#FF6600]">
                Categories
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800">{category.name}</li>
          </ol>
        </nav>

        {/* Category Banner */}
        <div className="relative h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden mb-6">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {category.name}
              </h1>
              <p className="text-lg max-w-2xl px-4">{category.description}</p>
              <p className="mt-2 text-sm">{category.productCount} products</p>
            </div>
          </div>
        </div>

        {/* Subcategories Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Shop by Subcategory</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {category.subcategories.map((sub) => (
              <Link
                key={sub.id}
                href={`/categories/${category.slug}/${sub.slug}`}
                className="bg-white p-3 rounded-lg border border-gray-200 text-center hover:shadow-md transition"
              >
                <div className="text-3xl mb-1">📦</div>
                <p className="font-medium text-sm truncate">{sub.name}</p>
                <p className="text-xs text-gray-500">
                  {sub.productCount} items
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Brands */}
        {category.brands && category.brands.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Popular Brands in {category.name}
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {category.brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandToggle(brand)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border ${
                    selectedBrands.includes(brand)
                      ? "bg-[#FF6600] text-white border-[#FF6600]"
                      : "bg-white border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile filter button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md"
          >
            <FiFilter /> Filters
          </button>
        </div>

        {/* Mobile filter drawer */}
        {showMobileFilters && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setShowMobileFilters(false)}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-4/5 max-w-sm bg-white overflow-y-auto p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <FiX size={24} />
                </button>
              </div>
              {/* Same filter content as desktop */}
              <div className="space-y-4">
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
                    />
                  </div>
                </div>

                {/* Brands filter */}
                {category.brands && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Brands</h4>
                    <div className="space-y-1">
                      {category.brands.map((brand) => (
                        <label
                          key={brand}
                          className="flex items-center text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandToggle(brand)}
                            className="mr-2"
                          />
                          {brand}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={clearAllFilters}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main content: filters (desktop) + products */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:w-72 space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-3 flex items-center gap-1">
                <FiFilter /> Filters
              </h3>

              {/* Price range */}
              <div className="mb-4">
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
                  />
                </div>
              </div>

              {/* Brands filter */}
              {category.brands && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Brands</h4>
                  <div className="space-y-1">
                    {category.brands.map((brand) => (
                      <label key={brand} className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="mr-2"
                        />
                        {brand}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={clearAllFilters}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Products area */}
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

            {/* Active filters chips */}
            {(selectedBrands.length > 0 ||
              priceRange.min > 0 ||
              priceRange.max < 500) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedBrands.map((brand) => (
                  <span
                    key={brand}
                    className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                  >
                    {brand}
                    <button onClick={() => handleBrandToggle(brand)}>
                      <FiX size={12} />
                    </button>
                  </span>
                ))}
                {(priceRange.min > 0 || priceRange.max < 500) && (
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    ${priceRange.min} - ${priceRange.max}
                    <button onClick={() => setPriceRange({ min: 0, max: 500 })}>
                      <FiX size={12} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Product grid */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500">No products match your filters.</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-2 text-[#FF6600] hover:underline"
                >
                  Clear Filters
                </button>
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

        {/* Popular searches in category */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">
            Popular searches in {category.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "wireless headphones",
              "smart watch",
              "gaming laptop",
              "bluetooth speaker",
            ].map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
