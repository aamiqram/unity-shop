// components/product/ProductCardB2B.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart, FiMessageSquare, FiCheckCircle } from "react-icons/fi";

const ProductCardB2B = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Default product structure (can be overridden by props)
  const {
    id = "1",
    title = "Wireless Bluetooth Earbuds with Charging Case",
    image = "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&auto=format&fit=crop",
    priceMin = 2.5,
    priceMax = 5.0,
    priceUnit = "piece",
    moq = 100,
    supplier = {
      name: "Shenzhen Tech Co., Ltd.",
      location: "Guangdong, China",
      flag: "🇨🇳",
      yearsInBusiness: 8,
      responseRate: 95,
      tradeAssurance: true,
      verified: true,
    },
    slug = "wireless-earbuds",
  } = product;

  return (
    <div
      className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container with hover zoom */}
      <Link
        href={`/products/${id}/${slug}`}
        className="block relative aspect-square overflow-hidden bg-gray-100"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        {/* Hover overlay with "Request Quote" */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium text-sm">
              Request Quote
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Product title */}
        <Link href={`/products/${id}/${slug}`} className="block">
          <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 h-10 sm:h-12 mb-2 hover:text-[#FF6600]">
            {title}
          </h3>
        </Link>

        {/* Price range */}
        <div className="mb-2">
          <span className="text-lg sm:text-xl font-bold text-[#FF6600]">
            ${priceMin.toFixed(2)} - ${priceMax.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500 ml-1">/ {priceUnit}</span>
        </div>

        {/* MOQ */}
        <div className="text-xs text-gray-500 mb-3">MOQ: {moq} pieces</div>

        {/* Supplier info */}
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-700 truncate max-w-[120px]">
              {supplier.name}
            </span>
            <div className="flex items-center gap-1">
              {supplier.verified && (
                <span className="text-[#FF6600]" title="Verified Supplier">
                  <FiCheckCircle size={14} />
                </span>
              )}
              {supplier.tradeAssurance && (
                <span className="bg-blue-100 text-blue-800 text-[10px] px-1 py-0.5 rounded">
                  TA
                </span>
              )}
            </div>
          </div>

          {/* Location with flag */}
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <span className="mr-1">{supplier.flag}</span>
            <span>{supplier.location}</span>
          </div>

          {/* Badges: years and response rate */}
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded">
              {supplier.yearsInBusiness}+ yrs
            </span>
            <span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded">
              {supplier.responseRate}% Response
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button className="flex-1 bg-[#FF6600] hover:bg-[#e65c00] text-white text-xs sm:text-sm py-2 rounded-md flex items-center justify-center gap-1 transition-colors">
              <FiMessageSquare size={16} />
              <span className="hidden sm:inline">Contact</span>
            </button>
            <button className="flex-1 border border-gray-300 hover:border-[#FF6600] text-gray-700 hover:text-[#FF6600] text-xs sm:text-sm py-2 rounded-md flex items-center justify-center gap-1 transition-colors">
              <FiShoppingCart size={16} />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardB2B;
