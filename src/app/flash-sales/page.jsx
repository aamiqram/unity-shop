// app/flash-sales/page.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiClock, FiZap, FiBell, FiShoppingCart } from "react-icons/fi";

// Mock flash sale products
const flashProducts = [
  {
    id: 1,
    title: "Wireless Bluetooth Earbuds",
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&auto=format&fit=crop",
    originalPrice: 49.99,
    flashPrice: 19.99,
    discount: 60,
    stock: 24,
    totalStock: 100,
    sold: 76,
    endsIn: 3600 * 2, // 2 hours
    category: "Electronics",
  },
  {
    id: 2,
    title: "Smart Watch Fitness Tracker",
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&auto=format&fit=crop",
    originalPrice: 79.99,
    flashPrice: 39.99,
    discount: 50,
    stock: 15,
    totalStock: 80,
    sold: 65,
    endsIn: 3600 * 1.5,
    category: "Electronics",
  },
  {
    id: 3,
    title: "Men's Casual T-Shirt (Pack of 3)",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&auto=format&fit=crop",
    originalPrice: 39.99,
    flashPrice: 19.99,
    discount: 50,
    stock: 42,
    totalStock: 150,
    sold: 108,
    endsIn: 3600 * 3,
    category: "Fashion",
  },
  {
    id: 4,
    title: "Stainless Steel Water Bottle",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&auto=format&fit=crop",
    originalPrice: 24.99,
    flashPrice: 9.99,
    discount: 60,
    stock: 8,
    totalStock: 60,
    sold: 52,
    endsIn: 3600 * 1,
    category: "Home & Garden",
  },
  {
    id: 5,
    title: "Portable Power Bank 20000mAh",
    image:
      "https://images.unsplash.com/photo-1609592424824-5ba6c7a3d34e?w=400&auto=format&fit=crop",
    originalPrice: 39.99,
    flashPrice: 17.99,
    discount: 55,
    stock: 11,
    totalStock: 70,
    sold: 59,
    endsIn: 3600 * 2.5,
    category: "Electronics",
  },
  {
    id: 6,
    title: "Yoga Mat Non-Slip",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&auto=format&fit=crop",
    originalPrice: 29.99,
    flashPrice: 14.99,
    discount: 50,
    stock: 19,
    totalStock: 80,
    sold: 61,
    endsIn: 3600 * 4,
    category: "Sports",
  },
  {
    id: 7,
    title: "LED Desk Lamp with Wireless Charger",
    image:
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=400&auto=format&fit=crop",
    originalPrice: 49.99,
    flashPrice: 24.99,
    discount: 50,
    stock: 6,
    totalStock: 40,
    sold: 34,
    endsIn: 3600 * 1.2,
    category: "Home & Garden",
  },
  {
    id: 8,
    title: "Wireless Mechanical Keyboard",
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&auto=format&fit=crop",
    originalPrice: 79.99,
    flashPrice: 39.99,
    discount: 50,
    stock: 3,
    totalStock: 30,
    sold: 27,
    endsIn: 3600 * 0.8,
    category: "Electronics",
  },
];

// Mock next flash sale products (teaser)
const nextFlashProducts = flashProducts.slice(0, 3).map((p) => ({
  ...p,
  flashPrice: p.flashPrice * 0.9, // even lower tomorrow
  discount: p.discount + 5,
}));

// Mock live purchases (will update)
const initialLiveFeed = [
  {
    id: 1,
    user: "Sarah from New York",
    product: "Wireless Earbuds",
    time: "just now",
  },
  { id: 2, user: "Mike from LA", product: "Smart Watch", time: "1 min ago" },
  {
    id: 3,
    user: "John from Texas",
    product: "Water Bottle",
    time: "2 min ago",
  },
  { id: 4, user: "Emma from Chicago", product: "Yoga Mat", time: "3 min ago" },
];

// Time slots
const timeSlots = [
  { label: "12 AM - 6 AM", ended: true },
  { label: "6 AM - 12 PM", ended: true },
  { label: "12 PM - 6 PM", active: true },
  { label: "6 PM - 12 AM", upcoming: true },
];

export default function FlashSalesPage() {
  const [timeLeft, setTimeLeft] = useState(3600 * 5 + 60 * 23); // 5h 23m for demo
  const [products, setProducts] = useState(flashProducts);
  const [liveFeed, setLiveFeed] = useState(initialLiveFeed);
  const [showReminderModal, setShowReminderModal] = useState(false);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate live purchases every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomProduct =
        products[Math.floor(Math.random() * products.length)];
      const randomUser = [
        "Alex from Miami",
        "Jessica from Boston",
        "David from Seattle",
        "Laura from Denver",
      ][Math.floor(Math.random() * 4)];
      const newPurchase = {
        id: Date.now(),
        user: randomUser,
        product: randomProduct.title,
        time: "just now",
      };
      setLiveFeed((prev) => [newPurchase, ...prev.slice(0, 4)]);
    }, 10000);
    return () => clearInterval(interval);
  }, [products]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-2">
            <FiZap className="text-yellow-300" /> Flash Sale
          </h1>
          <div className="text-3xl md:text-4xl font-mono bg-black bg-opacity-20 py-2 px-4 rounded inline-block">
            {formatTime(timeLeft)}
          </div>
          <p className="mt-2 text-orange-100">Hurry! Sale ends in:</p>
          <p className="text-sm mt-1">Next flash sale in: 6h 23m</p>
        </div>
      </section>

      {/* Time Slots */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex overflow-x-auto gap-2 pb-2">
          {timeSlots.map((slot, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${
                slot.active
                  ? "bg-[#FF6600] text-white"
                  : slot.ended
                    ? "bg-gray-300 text-gray-600"
                    : "bg-gray-200 text-gray-700"
              }`}
            >
              {slot.label}
              {slot.active && " (Active)"}
              {slot.ended && " (Ended)"}
              {slot.upcoming && " (Upcoming)"}
            </div>
          ))}
        </div>
      </section>

      {/* Main Flash Sale Grid */}
      <section className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition relative"
            >
              <Link href={`/products/${product.id}`} className="block">
                <div className="aspect-square relative">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                  {product.stock < 10 && (
                    <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      Only {product.stock} left!
                    </span>
                  )}
                </div>
              </Link>
              <div className="p-3">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-medium text-sm line-clamp-2 h-10 mb-1 hover:text-[#FF6600]">
                    {product.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl font-bold text-red-600">
                    ${product.flashPrice}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <FiClock size={12} />
                  <span>
                    Ends in {Math.floor(product.endsIn / 3600)}h{" "}
                    {Math.floor((product.endsIn % 3600) / 60)}m
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                  <div
                    className="bg-[#FF6600] h-1.5 rounded-full"
                    style={{
                      width: `${(product.sold / product.totalStock) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500">{product.sold} sold</p>
                <button className="w-full mt-2 py-1.5 bg-[#FF6600] text-white rounded text-sm hover:bg-[#e65c00] flex items-center justify-center gap-1">
                  <FiShoppingCart size={14} /> Grab Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sold Out Section (if any) */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold mb-3">Just Missed</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-60">
          {products.slice(0, 2).map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="aspect-square relative grayscale">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-bold">
                  Sold Out
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm line-clamp-2">
                  {product.title}
                </h3>
                <button className="text-xs text-[#FF6600] hover:underline mt-1">
                  Notify me
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Next Flash Sale Preview */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">
            Coming Up Next: 6 PM - 12 AM
          </h2>
          <p className="text-sm mb-3">Even bigger discounts! Set a reminder.</p>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {nextFlashProducts.map((p) => (
              <div key={p.id} className="bg-white bg-opacity-20 p-2 rounded">
                <p className="text-xs font-medium truncate">{p.title}</p>
                <p className="text-lg font-bold">${p.flashPrice}</p>
                <p className="text-xs line-through opacity-75">
                  ${p.originalPrice}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowReminderModal(true)}
            className="bg-white text-purple-700 px-4 py-2 rounded text-sm hover:bg-gray-100"
          >
            <FiBell className="inline mr-1" /> Set Reminder
          </button>
        </div>
      </section>

      {/* Live Activity Feed */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FiZap className="text-[#FF6600]" /> Live Purchases
          </h2>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {liveFeed.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 text-sm border-b border-gray-100 pb-1"
              >
                <span className="text-green-600 font-medium">{item.user}</span>
                <span className="text-gray-600">bought</span>
                <span className="font-medium text-[#FF6600]">
                  {item.product}
                </span>
                <span className="text-xs text-gray-400 ml-auto">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reminder Modal */}
      {showReminderModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowReminderModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-sm w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-2">Set a Reminder</h3>
            <p className="text-sm text-gray-600 mb-3">
              We'll notify you when the next flash sale starts.
            </p>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-[#FF6600] text-white rounded hover:bg-[#e65c00]">
                Notify by Email
              </button>
              <button className="flex-1 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50">
                Push
              </button>
            </div>
            <button
              className="mt-3 text-sm text-gray-500 hover:underline"
              onClick={() => setShowReminderModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Auto-refresh simulation note */}
      <div className="container mx-auto px-4 py-2 text-center text-xs text-gray-400">
        Page refreshes automatically when new deals go live.
      </div>
    </main>
  );
}
