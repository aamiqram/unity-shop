// app/dashboard/wishlist/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  FiHeart,
  FiShare2,
  FiTrash2,
  FiShoppingCart,
  FiPlus,
} from "react-icons/fi";
import { demoProducts } from "@/lib/demoProducts";

// Mock wishlist data (initially some items)
const initialLists = {
  default: {
    id: "default",
    name: "Default Wishlist",
    items: demoProducts.slice(0, 6).map((p) => ({
      ...p,
      addedDate: "2025-02-20",
      price: p.priceMin,
    })),
  },
  birthday: {
    id: "birthday",
    name: "Birthday Wishlist",
    items: demoProducts.slice(3, 5).map((p) => ({
      ...p,
      addedDate: "2025-02-18",
      price: p.priceMin,
    })),
  },
  gifts: {
    id: "gifts",
    name: "Gift Ideas",
    items: [],
  },
};

export default function WishlistPage() {
  const [lists, setLists] = useState(initialLists);
  const [activeListId, setActiveListId] = useState("default");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);

  const activeList = lists[activeListId];
  const items = activeList?.items || [];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(items.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const handleRemoveSelected = () => {
    setLists((prev) => ({
      ...prev,
      [activeListId]: {
        ...prev[activeListId],
        items: prev[activeListId].items.filter(
          (item) => !selectedItems.includes(item.id),
        ),
      },
    }));
    setSelectedItems([]);
  };

  const handleAddToCart = (itemId) => {
    // In a real app, you'd add to cart via context
    console.log("Add to cart:", itemId);
    // Optionally remove from wishlist after adding?
  };

  const handleCreateList = () => {
    const newId = `list-${Date.now()}`;
    setLists((prev) => ({
      ...prev,
      [newId]: {
        id: newId,
        name: "New List",
        items: [],
      },
    }));
    setActiveListId(newId);
  };

  const shareUrl = `https://unityshop.com/wishlist/${activeListId}`;

  return (
    <DashboardLayout>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">My Wishlist</h1>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              <FiShare2 size={16} />
              Share Wishlist
            </button>
            <button
              onClick={handleCreateList}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF6600] text-white rounded-md text-sm hover:bg-[#e65c00]"
            >
              <FiPlus size={16} />
              New List
            </button>
          </div>
        </div>

        {/* List tabs */}
        <div className="flex overflow-x-auto pb-2 mb-4 border-b border-gray-200">
          {Object.values(lists).map((list) => (
            <button
              key={list.id}
              onClick={() => setActiveListId(list.id)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeListId === list.id
                  ? "border-[#FF6600] text-[#FF6600]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {list.name} ({list.items.length})
            </button>
          ))}
        </div>

        {/* Batch actions bar (if items selected) */}
        {selectedItems.length > 0 && (
          <div className="bg-gray-50 p-3 rounded-md mb-4 flex flex-wrap items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedItems.length} item{selectedItems.length > 1 ? "s" : ""}{" "}
              selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  selectedItems.forEach((id) => handleAddToCart(id));
                  // Optionally clear selection
                }}
                className="flex items-center gap-1 px-3 py-1 bg-[#FF6600] text-white rounded text-sm hover:bg-[#e65c00]"
              >
                <FiShoppingCart size={14} />
                Add to Cart
              </button>
              <button
                onClick={handleRemoveSelected}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100"
              >
                <FiTrash2 size={14} />
                Remove
              </button>
            </div>
          </div>
        )}

        {/* Select all row */}
        {items.length > 0 && (
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={
                  selectedItems.length === items.length && items.length > 0
                }
                onChange={handleSelectAll}
                className="mr-2 rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
              />
              Select All
            </label>
          </div>
        )}

        {/* Product grid */}
        {items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <FiHeart className="mx-auto text-gray-300" size={48} />
            <p className="text-gray-500 mt-2">This wishlist is empty.</p>
            <Link
              href="/products"
              className="inline-block mt-4 px-6 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition relative group"
              >
                {/* Select checkbox */}
                <div className="absolute top-2 left-2 z-10">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="w-4 h-4 rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
                  />
                </div>

                {/* Remove button (heart filled) */}
                <button
                  onClick={() => handleRemoveSelected([item.id])}
                  className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
                >
                  <FiHeart className="text-[#FF6600] fill-current" size={16} />
                </button>

                <Link href={`/products/${item.id}/${item.slug}`}>
                  <div className="aspect-square relative bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                <div className="p-3">
                  <Link href={`/products/${item.id}/${item.slug}`}>
                    <h3 className="text-sm font-medium line-clamp-2 h-10 mb-1 hover:text-[#FF6600]">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-[#FF6600]">
                        ${item.priceMin.toFixed(2)}
                      </span>
                      {item.priceMax > item.priceMin && (
                        <span className="text-xs text-gray-500 line-through ml-1">
                          ${item.priceMax.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(item.addedDate).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Stock status */}
                  <p className="text-xs mt-1">
                    {item.inStock ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </p>

                  {/* Add to cart button */}
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className="w-full mt-2 py-1.5 bg-[#FF6600] text-white rounded text-sm hover:bg-[#e65c00] transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Share modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold mb-2">Share Wishlist</h3>
              <p className="text-sm text-gray-600 mb-4">
                Share this link with friends and family:
              </p>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(shareUrl);
                    alert("Link copied!");
                  }}
                  className="px-4 py-2 bg-[#FF6600] text-white rounded-r text-sm hover:bg-[#e65c00]"
                >
                  Copy
                </button>
              </div>
              <div className="flex gap-3 mt-4 justify-end">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
