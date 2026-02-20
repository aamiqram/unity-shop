"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCardB2B from "../product/ProductCardB2B";

const demoProducts = [
  {
    id: 1,
    title: "Smartphone X10 5G 128GB Unlocked",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    priceMin: 250,
    priceMax: 280,
    moq: "100 pieces",
    supplier: "Shenzhen Tech Co.",
    location: "Shenzhen, China",
    yearsInBusiness: 8,
    responseRate: 95,
    tradeAssurance: true,
  },
  {
    id: 2,
    title: "Wireless Bluetooth Earbuds with Charging Case",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    priceMin: 12,
    priceMax: 18,
    moq: "500 pieces",
    supplier: "Guangdong Audio Ltd.",
    location: "Guangzhou, China",
    yearsInBusiness: 5,
    responseRate: 98,
    tradeAssurance: true,
  },
  // Add more products up to 15...
  {
    id: 3,
    title: "Men's Cotton Casual T-Shirt",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    priceMin: 3.5,
    priceMax: 5.2,
    moq: "1000 pieces",
    supplier: "Bangladesh Textiles",
    location: "Dhaka, Bangladesh",
    yearsInBusiness: 12,
    responseRate: 92,
    tradeAssurance: false,
  },
  {
    id: 4,
    title: "Stainless Steel Water Bottle 500ml",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    priceMin: 2.8,
    priceMax: 4.2,
    moq: "300 pieces",
    supplier: "Yiwu Metalware",
    location: "Yiwu, China",
    yearsInBusiness: 6,
    responseRate: 94,
    tradeAssurance: true,
  },
  // Add more as needed
];

const tabs = ["Recommended", "Latest", "Top Suppliers"];

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState("Recommended");

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Featured Products
          </h2>
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-md">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                  activeTab === tab
                    ? "bg-white text-orange-500 shadow"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {demoProducts.map((product) => (
            <ProductCardB2B key={product.id} product={product} />
          ))}
        </div>

        {/* View All button */}
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-md font-medium transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
