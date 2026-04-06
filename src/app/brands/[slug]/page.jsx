// app/brands/[slug]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductCardB2B from "@/components/product/ProductCardB2B";
import { getBrandBySlug } from "@/lib/brands";
import { demoProducts } from "@/lib/demoProducts";
import {
  FiGlobe,
  FiCalendar,
  FiMapPin,
  FiHeart,
  FiShare2,
  FiMessageSquare,
} from "react-icons/fi";

export default function BrandPage({ params }) {
  const { slug } = params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const [sortBy, setSortBy] = useState("recommended");
  const [brandProducts, setBrandProducts] = useState([]);

  useEffect(() => {
    // Filter products by brand (in demo data, we'll match by brand name)
    const products = demoProducts.filter((p) => p.brand === brand.name);
    setBrandProducts(products);
  }, [brand]);

  const sortedProducts = [...brandProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.priceMin - b.priceMin;
    if (sortBy === "price-desc") return b.priceMax - a.priceMax;
    return 0;
  });

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Brand Header with Cover */}
      <div className="relative h-64 md:h-80">
        <Image
          src={brand.coverImage}
          alt={brand.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto px-4 flex items-end gap-4">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-lg p-1 flex items-center justify-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">{brand.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                  >
                    <FiGlobe size={14} /> Official Site
                  </a>
                )}
                {brand.founded && (
                  <span className="flex items-center gap-1">
                    <FiCalendar size={14} /> Est. {brand.founded}
                  </span>
                )}
                {brand.country && (
                  <span className="flex items-center gap-1">
                    <FiMapPin size={14} /> {brand.country}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                <FiHeart size={20} />
              </button>
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                <FiShare2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Info & Actions */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <p className="text-gray-700">{brand.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {brand.categories.map((cat) => (
              <Link
                key={cat}
                href={`/categories/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Products from {brand.name}</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No products from this brand yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {sortedProducts.map((product) => (
              <ProductCardB2B key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Contact Seller CTA */}
        <div className="mt-8 bg-gradient-to-r from-[#FF6600] to-orange-600 text-white rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">
            Want to become a supplier for {brand.name}?
          </h3>
          <p className="mb-4">
            Contact our brand partnerships team to learn more.
          </p>
          <button className="bg-white text-[#FF6600] px-6 py-2 rounded-md font-semibold hover:bg-gray-100 flex items-center gap-2 mx-auto">
            <FiMessageSquare size={18} /> Inquire Now
          </button>
        </div>
      </div>
    </main>
  );
}
