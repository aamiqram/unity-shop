// components/product/ProductDetailB2B.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiMinus,
  FiPlus,
  FiMessageSquare,
  FiShoppingCart,
  FiFileText,
} from "react-icons/fi";
import SupplierCard from "./SupplierCard";

const ProductDetailB2B = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(product.moq || 1);
  const [activeTab, setActiveTab] = useState("description");

  // Price tiers example
  const priceTiers = [
    { quantity: "100-499", price: product.priceMin },
    { quantity: "500-999", price: (product.priceMin * 0.9).toFixed(2) },
    { quantity: "1000+", price: (product.priceMin * 0.85).toFixed(2) },
  ];

  // Mock additional images
  const images = [
    product.image,
    "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=400&auto=format&fit=crop",
  ];

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= product.moq) {
      setQuantity(newQty);
    }
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-[#FF6600]">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/products" className="hover:text-[#FF6600]">
              Products
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-800 truncate">{product.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Image gallery */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-2">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 flex-shrink-0 border-2 rounded overflow-hidden ${
                    selectedImage === img
                      ? "border-[#FF6600]"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle column: Product info */}
        <div className="lg:col-span-1">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            {product.title}
          </h1>

          {/* Price tiers table */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Price tiers</h3>
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-1">Quantity (pieces)</th>
                  <th className="text-right py-1">Unit price ($)</th>
                </tr>
              </thead>
              <tbody>
                {priceTiers.map((tier) => (
                  <tr key={tier.quantity}>
                    <td className="py-1">{tier.quantity}</td>
                    <td className="text-right font-medium">{tier.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOQ */}
          <div className="mb-4">
            <span className="text-sm text-gray-500">Minimum Order: </span>
            <span className="font-semibold">{product.moq} pieces</span>
          </div>

          {/* Variant selectors (optional) */}
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">Color</label>
            <div className="flex gap-2">
              {["Black", "White", "Blue"].map((color) => (
                <button
                  key={color}
                  className="px-3 py-1 border border-gray-300 rounded text-sm hover:border-[#FF6600]"
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity selector */}
          <div className="mb-6">
            <label className="block text-sm text-gray-500 mb-1">Quantity</label>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 border border-gray-300 rounded-l"
              >
                <FiMinus size={16} />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(product.moq, Number(e.target.value)))
                }
                className="w-20 text-center border-y border-gray-300 py-2 focus:outline-none"
                min={product.moq}
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 border border-gray-300 rounded-r"
              >
                <FiPlus size={16} />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-[#FF6600] text-white py-3 rounded-md hover:bg-[#e65c00] transition-colors flex items-center justify-center gap-2">
              <FiFileText size={18} />
              Request Quote
            </button>
            <button className="flex-1 border border-[#FF6600] text-[#FF6600] py-3 rounded-md hover:bg-[#FF6600] hover:text-white transition-colors flex items-center justify-center gap-2">
              <FiMessageSquare size={18} />
              Contact Supplier
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <FiShoppingCart size={18} />
              Add to Inquiry
            </button>
          </div>

          {/* Additional info */}
          <div className="mt-4 text-xs text-gray-500">
            * Price may vary based on customization
          </div>
        </div>

        {/* Right column: Supplier card */}
        <div className="lg:col-span-1">
          <SupplierCard supplier={product.supplier} />
        </div>
      </div>

      {/* Tabs section */}
      <div className="mt-10">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-6 overflow-x-auto">
            {["description", "specifications", "company", "reviews"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? "border-[#FF6600] text-[#FF6600]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ),
            )}
          </nav>
        </div>
        <div className="py-4">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          )}
          {activeTab === "specifications" && (
            <table className="w-full text-sm">
              <tbody>
                {product.specifications?.map((spec, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-2 font-medium text-gray-700 w-1/3">
                      {spec.name}
                    </td>
                    <td className="py-2 text-gray-600">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === "company" && (
            <div className="prose max-w-none">
              <p>{product.companyProfile}</p>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              {product.reviews?.length > 0 ? (
                product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-3"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{review.user}</span>
                      <span className="text-yellow-500">
                        {"★".repeat(review.rating)}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{review.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailB2B;
