// app/help/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { helpCategories, popularArticles, faqs } from "@/lib/helpData";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  // Filter categories based on search
  const filteredCategories = helpCategories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.articles.some((a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header with search */}
      <section className="bg-gradient-to-r from-[#FF6600] to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-xl mb-8">How can we help you today?</p>
          <div className="max-w-2xl mx-auto relative">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="text-sm text-orange-100">Popular searches:</span>
            {[
              "Track order",
              "Return policy",
              "Payment methods",
              "Seller registration",
            ].map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-3 py-1 bg-orange-500 rounded-full text-xs hover:bg-orange-400 transition"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/help/${cat.id}`}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition group"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-[#FF6600]">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{cat.description}</p>
                <p className="text-xs text-gray-400">
                  {cat.articleCount} articles
                </p>
                <div className="mt-3 text-sm text-[#FF6600]">View all →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular articles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Most Helpful Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {popularArticles.map((article) => (
              <Link
                key={article.id}
                href={`/help/${article.category}/${article.id}`}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#FF6600] hover:shadow-sm"
              >
                <div>
                  <h3 className="font-medium text-gray-800">{article.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {article.views.toLocaleString()} views
                  </p>
                </div>
                <span className="text-[#FF6600]">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg bg-white"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-4 py-3 text-left flex justify-between items-center"
                >
                  <span className="font-medium text-gray-800">
                    {faq.question}
                  </span>
                  <FiChevronDown
                    className={`text-gray-500 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                    size={20}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-3 text-sm text-gray-600 border-t border-gray-100 pt-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#FF6600] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="mb-6">
            Can't find what you're looking for? Our support team is here for
            you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-[#FF6600] font-semibold rounded-md hover:bg-gray-100"
            >
              Contact Support
            </Link>
            <Link
              href="/contact?chat=1"
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-[#FF6600] transition"
            >
              Live Chat
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
