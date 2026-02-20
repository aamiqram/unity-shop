"use client";

import { useState } from "react";
import Image from "next/image";
import SupplierCard from "./SupplierCard";
import { FiShield } from "react-icons/fi";

export default function ProductDetailB2B({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.variants?.colors?.[0] || "",
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.variants?.storage?.[0] || "",
  );
  const [quantity, setQuantity] = useState(
    product.moq ? parseInt(product.moq) || 100 : 100,
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left: Image Gallery */}
      <div className="lg:col-span-2">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col order-2 md:order-1 space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-visible">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`flex-shrink-0 w-16 h-16 border-2 rounded overflow-hidden ${
                  selectedImage === idx
                    ? "border-orange-500"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          {/* Main image */}
          <div className="flex-1 relative aspect-square order-1 md:order-2">
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Right: Product Info */}
      <div>
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

        {/* Price Tiers */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Price (FOB)</h3>
          <table className="w-full text-sm">
            <tbody>
              {product.priceTiers.map((tier, idx) => (
                <tr key={idx} className="border-b last:border-0">
                  <td className="py-2">{tier.quantity} pieces</td>
                  <td className="py-2 font-bold text-orange-500">
                    ${tier.price}/piece
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOQ */}
        <div className="mb-4">
          <span className="text-gray-600">Minimum Order Quantity: </span>
          <span className="font-semibold">{product.moq}</span>
        </div>

        {/* Variants */}
        {product.variants?.colors && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Color</label>
            <div className="flex flex-wrap gap-2">
              {product.variants.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedColor === color
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.variants?.storage && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Storage</label>
            <div className="flex flex-wrap gap-2">
              {product.variants.storage.map((storage) => (
                <button
                  key={storage}
                  onClick={() => setSelectedStorage(storage)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedStorage === storage
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
            min={product.moq ? parseInt(product.moq) : 1}
            className="border rounded-md px-3 py-2 w-32"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-md">
            Request Quote
          </button>
          <button className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-50 font-medium py-3 rounded-md">
            Contact Supplier
          </button>
        </div>
        <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 rounded-md mb-8">
          Add to Inquiry Basket
        </button>

        {/* Supplier Card */}
        <SupplierCard supplier={product.supplier} />
      </div>

      {/* Tabs Section (below) */}
      <div className="lg:col-span-3 mt-8">
        <div className="border-b">
          <nav className="flex space-x-8">
            <button className="py-2 border-b-2 border-orange-500 text-orange-500 font-medium">
              Product Description
            </button>
            <button className="py-2 text-gray-500 hover:text-gray-700">
              Specifications
            </button>
            <button className="py-2 text-gray-500 hover:text-gray-700">
              Company Profile
            </button>
            <button className="py-2 text-gray-500 hover:text-gray-700">
              Reviews & Ratings
            </button>
          </nav>
        </div>
        <div className="py-6">
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
          {/* Specifications table */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Specifications</h3>
            <table className="min-w-full border">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key} className="border-b">
                    <td className="py-2 px-4 bg-gray-50 font-medium w-1/3">
                      {key}
                    </td>
                    <td className="py-2 px-4">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
