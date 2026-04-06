// app/brands/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { brands, alphabet, brandsByLetter } from "@/lib/brands";

export default function BrandsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter brands by search and category
  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = brand.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || brand.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Group filtered brands by first letter
  const filteredByLetter = filteredBrands.reduce((acc, brand) => {
    const letter = brand.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(brand);
    return acc;
  }, {});

  const sortedLetters = alphabet.filter((letter) => filteredByLetter[letter]);

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Shop by Brand
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Browse top brands and discover new favorites
        </p>

        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
          <div className="flex-1 relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        {/* Featured brands */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brands
              .filter((b) => b.featured)
              .map((brand) => (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.slug}`}
                  className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:shadow-md transition"
                >
                  <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-sm">{brand.name}</h3>
                  <p className="text-xs text-gray-500">
                    {brand.productCount} products
                  </p>
                </Link>
              ))}
          </div>
        </div>

        {/* A-Z navigation */}
        <div className="sticky top-16 bg-white z-10 py-2 border-b border-gray-200 mb-6">
          <div className="flex flex-wrap justify-center gap-1">
            {alphabet.map((letter) => (
              <a
                key={letter}
                href={`#${letter}`}
                className={`w-6 h-6 flex items-center justify-center text-sm font-medium rounded ${
                  filteredByLetter[letter]
                    ? "text-[#FF6600] hover:bg-orange-100"
                    : "text-gray-300 pointer-events-none"
                }`}
              >
                {letter}
              </a>
            ))}
          </div>
        </div>

        {/* Brands by letter */}
        {sortedLetters.map((letter) => (
          <div key={letter} id={letter} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{letter}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredByLetter[letter].map((brand) => (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.slug}`}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition group"
                >
                  <div className="w-20 h-20 mx-auto mb-2 bg-gray-50 rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={80}
                      height={80}
                      className="object-contain p-2"
                    />
                  </div>
                  <h3 className="font-medium text-sm text-center group-hover:text-[#FF6600]">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-center text-gray-500">
                    {brand.productCount} products
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {filteredBrands.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No brands found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
