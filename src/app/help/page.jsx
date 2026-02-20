"use client";
import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";

const categories = [
  { name: "Ordering", icon: "🛒", count: 12 },
  { name: "Shipping", icon: "📦", count: 8 },
  { name: "Returns", icon: "↩️", count: 6 },
  { name: "Payments", icon: "💳", count: 10 },
  { name: "Account", icon: "👤", count: 7 },
  { name: "Selling", icon: "🏪", count: 15 },
];

const faqs = [
  {
    q: "How do I track my order?",
    a: "You can track your order from the My Orders page...",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 30 days...",
  },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Help Center</h1>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <FiSearch className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="How can we help you?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border rounded-full"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          <span className="text-sm text-gray-500">Popular:</span>
          <Link
            href="/help/track-order"
            className="text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200"
          >
            Track order
          </Link>
          <Link
            href="/help/return-policy"
            className="text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200"
          >
            Return policy
          </Link>
        </div>
      </div>

      {/* Category grid */}
      <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/help/${cat.name.toLowerCase()}`}
            className="bg-white p-4 border rounded-lg text-center hover:shadow-md"
          >
            <span className="text-3xl">{cat.icon}</span>
            <p className="font-medium mt-2">{cat.name}</p>
            <p className="text-xs text-gray-500">{cat.count} articles</p>
          </Link>
        ))}
      </div>

      {/* FAQ accordion */}
      <h2 className="text-2xl font-semibold mb-6">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto bg-white rounded-lg border divide-y">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="flex justify-between items-center w-full p-4 text-left"
            >
              <span className="font-medium">{faq.q}</span>
              {openFaq === i ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {openFaq === i && (
              <div className="p-4 pt-0 text-gray-600">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
