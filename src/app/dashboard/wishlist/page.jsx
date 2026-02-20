"use client";
import { useState } from "react";
import Link from "next/link";
import { FiHeart, FiShare2, FiShoppingCart } from "react-icons/fi";

const wishlists = [
  { id: "default", name: "Default", count: 12 },
  { id: "birthday", name: "Birthday Wishlist", count: 5 },
];

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1606741965583-5c4b0a5e4b0a?w=200",
    stock: "In Stock",
    dateAdded: "Mar 10, 2025",
  },
  // ... more
];

export default function WishlistPage() {
  const [activeList, setActiveList] = useState("default");
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const selectAll = () => {
    if (selected.length === products.length) {
      setSelected([]);
    } else {
      setSelected(products.map((p) => p.id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          My Wishlist ({products.length} items)
        </h1>
        <div className="space-x-2">
          <button className="border px-4 py-2 rounded-lg text-sm flex items-center">
            <FiShare2 className="mr-2" /> Share
          </button>
          <button className="border px-4 py-2 rounded-lg text-sm">
            Create New List
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {wishlists.map((list) => (
          <button
            key={list.id}
            onClick={() => setActiveList(list.id)}
            className={`pb-2 border-b-2 ${
              activeList === list.id
                ? "border-orange text-orange"
                : "border-transparent"
            }`}
          >
            {list.name} ({list.count})
          </button>
        ))}
      </div>

      {/* Bulk actions */}
      {selected.length > 0 && (
        <div className="bg-gray-100 p-3 rounded-lg mb-4 flex items-center justify-between">
          <span>{selected.length} items selected</span>
          <div>
            <button className="text-orange mr-4">Add to Cart</button>
            <button className="text-red-600">Remove</button>
          </div>
        </div>
      )}

      {/* Select all */}
      <div className="flex items-center mb-3">
        <input
          type="checkbox"
          checked={selected.length === products.length}
          onChange={selectAll}
          className="mr-2 accent-orange"
        />
        <span className="text-sm">Select All</span>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden relative group"
          >
            <input
              type="checkbox"
              checked={selected.includes(product.id)}
              onChange={() => toggleSelect(product.id)}
              className="absolute top-2 left-2 z-10 accent-orange"
            />
            <div className="relative h-40">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                <FiHeart className="text-red-500 fill-current" />
              </button>
            </div>
            <div className="p-3">
              <Link
                href={`/products/${product.id}`}
                className="font-medium line-clamp-2 hover:text-orange"
              >
                {product.name}
              </Link>
              <div className="mt-1">
                <span className="font-bold text-orange">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="ml-2 text-sm text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {product.stock} · Added {product.dateAdded}
              </p>
              <button className="mt-2 w-full bg-orange text-white py-1 rounded text-sm hover:bg-orange/90">
                <FiShoppingCart className="inline mr-1" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
