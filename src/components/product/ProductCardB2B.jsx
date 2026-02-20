"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiShield, FiMessageSquare, FiShoppingCart } from "react-icons/fi";

export default function ProductCardB2B({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  // Default product data structure
  const {
    id,
    title,
    image,
    priceMin,
    priceMax,
    unit = "piece",
    moq,
    supplier,
    location,
    yearsInBusiness,
    responseRate,
    tradeAssurance = true,
  } = product;

  return (
    <div
      className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with zoom */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        {/* Overlay with "Request Quote" on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium">
              Request Quote
            </button>
          </div>
        )}
      </div>

      <div className="p-3">
        {/* Title */}
        <h3 className="font-medium text-gray-800 line-clamp-2 h-12 mb-2">
          <Link href={`/products/${id}`} className="hover:text-orange-500">
            {title}
          </Link>
        </h3>

        {/* Price Range */}
        <div className="mb-2">
          <span className="text-orange-500 font-bold text-lg">
            ${priceMin} - ${priceMax}
          </span>
          <span className="text-gray-500 text-sm ml-1">/{unit}</span>
        </div>

        {/* MOQ Badge */}
        <div className="text-sm text-gray-600 mb-3">
          MOQ: <span className="font-medium">{moq}</span>
        </div>

        {/* Supplier Info */}
        <div className="border-t pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{supplier}</span>
            <div className="flex items-center space-x-1">
              {tradeAssurance && (
                <span title="Trade Assurance" className="text-orange-500">
                  <FiShield size={16} />
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <span>{location}</span>
            <span className="mx-1">•</span>
            <span>{yearsInBusiness}+ yrs</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded">
              {responseRate}% Response
            </span>
            <div className="flex space-x-2">
              <button title="Contact Supplier">
                <FiMessageSquare
                  size={16}
                  className="text-gray-600 hover:text-orange-500"
                />
              </button>
              <button title="Add to Cart">
                <FiShoppingCart
                  size={16}
                  className="text-gray-600 hover:text-orange-500"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
