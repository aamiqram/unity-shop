// app/recently-viewed/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiEye,
  FiX,
  FiHeart,
  FiShoppingCart,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import { demoProducts } from "@/lib/demoProducts";

// Helper to get viewed products from localStorage
const getViewedProducts = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("recentlyViewed");
  return stored ? JSON.parse(stored) : [];
};

// Save viewed product
const saveViewedProduct = (product) => {
  const viewed = getViewedProducts();
  // Remove if already exists (to move to front)
  const filtered = viewed.filter((p) => p.id !== product.id);
  const updated = [product, ...filtered].slice(0, 50); // keep max 50
  localStorage.setItem("recentlyViewed", JSON.stringify(updated));
  return updated;
};

// Enhance products with random view timestamps (for demo)
const now = Date.now();
const demoViewed = demoProducts.slice(0, 12).map((product, index) => ({
  ...product,
  viewedAt: now - index * 3600000 * (Math.random() * 24 + 1), // random hours ago
  priceAtView: product.priceMin * (0.9 + Math.random() * 0.3), // random price at view time
}));

export default function RecentlyViewedPage() {
  const [viewed, setViewed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState({}); // { productId: boolean }

  useEffect(() => {
    // Load from localStorage or use demo data if empty
    const stored = getViewedProducts();
    if (stored.length > 0) {
      setViewed(stored);
    } else {
      setViewed(demoViewed);
    }
    setIsLoading(false);
  }, []);

  const handleRemove = (productId) => {
    const updated = viewed.filter((p) => p.id !== productId);
    setViewed(updated);
    localStorage.setItem("recentlyViewed", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (confirm("Clear all recently viewed products?")) {
      setViewed([]);
      localStorage.removeItem("recentlyViewed");
    }
  };

  const togglePriceAlert = (productId) => {
    setPriceAlerts((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  // Group by date
  const groups = {
    Today: [],
    Yesterday: [],
    "This Week": [],
    Earlier: [],
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  viewed.forEach((product) => {
    const viewedDate = new Date(product.viewedAt || Date.now());
    if (viewedDate >= today) {
      groups.Today.push(product);
    } else if (viewedDate >= yesterday) {
      groups.Yesterday.push(product);
    } else if (viewedDate >= weekAgo) {
      groups["This Week"].push(product);
    } else {
      groups.Earlier.push(product);
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold">Recently Viewed</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {viewed.length} products
            </span>
            {viewed.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-sm text-red-600 hover:underline"
              >
                Clear History
              </button>
            )}
          </div>
        </div>

        {viewed.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-lg border border-gray-200">
            <FiEye className="mx-auto text-gray-300 text-4xl mb-2" />
            <p className="text-gray-500">No recently viewed products.</p>
            <p className="text-xs text-gray-400 mt-1">
              Browse products to see them here.
            </p>
            <Link
              href="/products"
              className="inline-block mt-4 px-4 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groups).map(([groupName, products]) => {
              if (products.length === 0) return null;
              return (
                <div key={groupName}>
                  <h2 className="text-lg font-semibold mb-2">{groupName}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                    {products.map((product) => {
                      const hoursAgo = Math.floor(
                        (Date.now() -
                          new Date(product.viewedAt || Date.now())) /
                          3600000,
                      );
                      const priceNow = product.priceMin;
                      const priceThen = product.priceAtView || product.priceMin;
                      const priceDiff = priceNow - priceThen;
                      const priceChangePercent = (
                        ((priceNow - priceThen) / priceThen) *
                        100
                      ).toFixed(1);
                      const priceDropped = priceDiff < 0;
                      const priceIncreased = priceDiff > 0;

                      return (
                        <div
                          key={product.id}
                          className="bg-white border border-gray-200 rounded-lg overflow-hidden relative group"
                        >
                          <button
                            onClick={() => handleRemove(product.id)}
                            className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition"
                            title="Remove from history"
                          >
                            <FiX size={14} />
                          </button>
                          <Link
                            href={`/products/${product.id}/${product.slug}`}
                            className="block"
                          >
                            <div className="aspect-square relative bg-gray-100">
                              <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </Link>
                          <div className="p-2">
                            <Link
                              href={`/products/${product.id}/${product.slug}`}
                              className="text-sm font-medium line-clamp-2 h-10 hover:text-[#FF6600]"
                            >
                              {product.title}
                            </Link>
                            <p className="text-xs text-gray-400 mt-1">
                              Viewed{" "}
                              {hoursAgo < 1
                                ? "just now"
                                : hoursAgo < 24
                                  ? `${hoursAgo}h ago`
                                  : `${Math.floor(hoursAgo / 24)}d ago`}
                            </p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-semibold text-[#FF6600]">
                                ${priceNow.toFixed(2)}
                              </span>
                              {priceDropped && (
                                <span className="text-xs text-green-600 flex items-center gap-0.5">
                                  <FiTrendingDown size={12} />{" "}
                                  {Math.abs(priceChangePercent)}%
                                </span>
                              )}
                              {priceIncreased && (
                                <span className="text-xs text-red-600 flex items-center gap-0.5">
                                  <FiTrendingUp size={12} />{" "}
                                  {priceChangePercent}%
                                </span>
                              )}
                            </div>
                            {priceDropped && (
                              <p className="text-xs text-green-600">
                                Price dropped since you viewed
                              </p>
                            )}
                            {product.stock < 10 && product.stock > 0 && (
                              <p className="text-xs text-orange-600">
                                Almost sold out
                              </p>
                            )}
                            {product.stock === 0 && (
                              <p className="text-xs text-red-600">
                                Out of stock
                              </p>
                            )}
                            <div className="flex gap-1 mt-2">
                              <button className="flex-1 bg-[#FF6600] text-white py-1 rounded text-xs flex items-center justify-center gap-1 hover:bg-[#e65c00]">
                                <FiShoppingCart size={12} /> Add
                              </button>
                              <button
                                onClick={() => togglePriceAlert(product.id)}
                                className={`p-1 rounded text-xs border ${
                                  priceAlerts[product.id]
                                    ? "bg-green-100 border-green-300 text-green-700"
                                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                                }`}
                                title={
                                  priceAlerts[product.id]
                                    ? "Alert set"
                                    : "Set price alert"
                                }
                              >
                                <FiHeart
                                  size={14}
                                  fill={
                                    priceAlerts[product.id]
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Privacy note */}
        <p className="text-xs text-gray-400 mt-4">
          Your recently viewed products are stored locally on your device.
          {!viewed.length && " Browse products to start building your history."}
        </p>
      </div>
    </main>
  );
}
