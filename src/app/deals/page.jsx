// app/deals/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiClock, FiTag, FiPercent, FiCopy } from "react-icons/fi";

// Mock deals data
const deals = [
  {
    id: 1,
    title: "Wireless Bluetooth Earbuds",
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&auto=format&fit=crop",
    originalPrice: 49.99,
    dealPrice: 29.99,
    discount: 40,
    claimed: 75,
    total: 100,
    endsIn: 3600 * 5, // 5 hours in seconds
    category: "Electronics",
  },
  {
    id: 2,
    title: "Men's Casual Slim Fit T-Shirt",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&auto=format&fit=crop",
    originalPrice: 19.99,
    dealPrice: 9.99,
    discount: 50,
    claimed: 120,
    total: 150,
    endsIn: 3600 * 2,
    category: "Fashion",
  },
  {
    id: 3,
    title: "Stainless Steel Water Bottle",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&auto=format&fit=crop",
    originalPrice: 24.99,
    dealPrice: 14.99,
    discount: 40,
    claimed: 45,
    total: 80,
    endsIn: 3600 * 8,
    category: "Home & Garden",
  },
  {
    id: 4,
    title: "Smart LED TV 32-inch",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format&fit=crop",
    originalPrice: 249.99,
    dealPrice: 179.99,
    discount: 28,
    claimed: 30,
    total: 50,
    endsIn: 3600 * 12,
    category: "Electronics",
  },
  {
    id: 5,
    title: "Fitness Tracker Smart Watch",
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&auto=format&fit=crop",
    originalPrice: 79.99,
    dealPrice: 49.99,
    discount: 38,
    claimed: 85,
    total: 120,
    endsIn: 3600 * 3,
    category: "Electronics",
  },
  {
    id: 6,
    title: "Yoga Mat Non-Slip",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&auto=format&fit=crop",
    originalPrice: 29.99,
    dealPrice: 19.99,
    discount: 33,
    claimed: 60,
    total: 100,
    endsIn: 3600 * 6,
    category: "Sports",
  },
  {
    id: 7,
    title: "Ceramic Coffee Mug Set",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&auto=format&fit=crop",
    originalPrice: 34.99,
    dealPrice: 24.99,
    discount: 29,
    claimed: 40,
    total: 75,
    endsIn: 3600 * 4,
    category: "Home & Garden",
  },
  {
    id: 8,
    title: "Power Bank 20000mAh",
    image:
      "https://images.unsplash.com/photo-1609592424824-5ba6c7a3d34e?w=400&auto=format&fit=crop",
    originalPrice: 39.99,
    dealPrice: 19.99,
    discount: 50,
    claimed: 150,
    total: 200,
    endsIn: 3600 * 1,
    category: "Electronics",
  },
];

// Flash sales (shorter time)
const flashSales = deals.slice(0, 4).map((d) => ({ ...d, endsIn: 3600 * 1.5 }));

// Coupons
const coupons = [
  {
    code: "SAVE10",
    discount: "10% off",
    minPurchase: "$50",
    expiry: "2025-03-31",
  },
  {
    code: "FREESHIP",
    discount: "Free shipping",
    minPurchase: "$30",
    expiry: "2025-03-15",
  },
  {
    code: "WELCOME20",
    discount: "20% off",
    minPurchase: "$100",
    expiry: "2025-04-01",
  },
];

// Bundle deals
const bundles = [
  {
    id: 1,
    title: "Work From Home Bundle",
    items: ["Wireless Earbuds", "Laptop Stand", "Desk Lamp"],
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    image:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Fitness Starter Pack",
    items: ["Yoga Mat", "Water Bottle", "Fitness Tracker"],
    price: 79.99,
    originalPrice: 114.97,
    discount: 30,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&auto=format&fit=crop",
  },
];

const categories = ["All", "Electronics", "Fashion", "Home & Garden", "Sports"];

export default function DealsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("discount");
  const [timeLeft, setTimeLeft] = useState(3600 * 12); // 12 hours for main deals countdown

  // Countdown effect for hero
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Filter and sort deals
  const filteredDeals = deals.filter(
    (d) => activeCategory === "All" || d.category === activeCategory,
  );
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (sortBy === "discount") return b.discount - a.discount;
    if (sortBy === "ending") return a.endsIn - b.endsIn;
    if (sortBy === "price-low") return a.dealPrice - b.dealPrice;
    if (sortBy === "price-high") return b.dealPrice - a.dealPrice;
    if (sortBy === "newest") return b.id - a.id; // mock
    return 0;
  });

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#FF6600] to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Today's Best Deals
          </h1>
          <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-mono bg-orange-700 bg-opacity-30 py-2 px-4 rounded inline-block">
            <FiClock className="inline" />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <p className="mt-2 text-orange-100">New deals added daily</p>
        </div>
      </section>

      {/* Featured Deal */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 relative h-64 md:h-auto">
            <Image
              src={deals[0].image}
              alt={deals[0].title}
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6 flex flex-col justify-center">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded inline-block w-fit mb-2">
              Deal of the Day
            </span>
            <h2 className="text-2xl font-bold mb-2">{deals[0].title}</h2>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold text-[#FF6600]">
                ${deals[0].dealPrice}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ${deals[0].originalPrice}
              </span>
              <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                Save {deals[0].discount}%
              </span>
            </div>
            <p className="text-gray-600 mb-4">Limited quantity available</p>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs">
                <div
                  className="bg-[#FF6600] h-2 rounded-full"
                  style={{
                    width: `${(deals[0].claimed / deals[0].total) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm text-gray-500">
                {deals[0].claimed} claimed
              </span>
            </div>
            <Link
              href={`/products/${deals[0].id}`}
              className="bg-[#FF6600] text-white px-6 py-2 rounded-md w-fit hover:bg-[#e65c00]"
            >
              Claim Deal
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#FF6600] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="discount">Highest Discount</option>
            <option value="ending">Ending Soon</option>
            <option value="price-low">Price Low-High</option>
            <option value="price-high">Price High-Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="container mx-auto px-4 py-4">
        <h2 className="text-xl font-semibold mb-4">All Deals</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
            >
              <Link href={`/products/${deal.id}`} className="block relative">
                <div className="aspect-square relative">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {deal.discount}% OFF
                  </span>
                </div>
              </Link>
              <div className="p-3">
                <Link href={`/products/${deal.id}`}>
                  <h3 className="font-medium text-sm line-clamp-2 h-10 mb-1 hover:text-[#FF6600]">
                    {deal.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-[#FF6600]">
                    ${deal.dealPrice}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ${deal.originalPrice}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <FiClock size={12} />
                  <span>Ends in {Math.floor(deal.endsIn / 3600)}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                  <div
                    className="bg-[#FF6600] h-1 rounded-full"
                    style={{ width: `${(deal.claimed / deal.total) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {deal.claimed} claimed
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sales */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FiTag className="text-[#FF6600]" /> Flash Sales
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flashSales.map((deal) => (
            <div
              key={deal.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <Link href={`/products/${deal.id}`} className="block relative">
                <div className="aspect-square relative">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {deal.discount}% OFF
                  </span>
                </div>
              </Link>
              <div className="p-2">
                <h3 className="font-medium text-xs line-clamp-2 h-8 mb-1">
                  {deal.title}
                </h3>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#FF6600] text-sm">
                    ${deal.dealPrice}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ${deal.originalPrice}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <FiClock size={10} />
                  <span>{Math.floor(deal.endsIn / 3600)}h left</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coupon Codes */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FiPercent className="text-[#FF6600]" /> Coupon Codes
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-lg">{coupon.code}</p>
                <p className="text-sm text-gray-600">{coupon.discount}</p>
                <p className="text-xs text-gray-400">
                  Min: {coupon.minPurchase} · Expires {coupon.expiry}
                </p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(coupon.code)}
                className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                title="Copy code"
              >
                <FiCopy size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Clearance Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Clearance Sale</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-lg font-medium text-red-800">
            Final reductions – while supplies last!
          </p>
          <Link
            href="/clearance"
            className="inline-block mt-2 text-[#FF6600] hover:underline"
          >
            Shop Clearance →
          </Link>
        </div>
      </section>

      {/* Bundle Deals */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Bundle Deals</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden flex"
            >
              <div className="w-1/3 relative h-32">
                <Image
                  src={bundle.image}
                  alt={bundle.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-2/3 p-3">
                <h3 className="font-semibold">{bundle.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {bundle.items.join(" + ")}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-[#FF6600]">
                    ${bundle.price}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ${bundle.originalPrice}
                  </span>
                  <span className="text-xs bg-green-100 text-green-800 px-1 rounded">
                    Save {bundle.discount}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Email Alerts */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-100 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Never miss a deal!</h2>
          <p className="text-gray-600 mb-4">
            Get notified of new deals and flash sales.
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
              required
            />
            <button className="px-4 py-2 bg-[#FF6600] text-white rounded hover:bg-[#e65c00]">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
