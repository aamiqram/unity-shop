// app/sellers/resources/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiSearch,
  FiPlay,
  FiDownload,
  FiUsers,
  FiCalendar,
  FiBookOpen,
  FiTool,
} from "react-icons/fi";

// Quick start guides
const quickGuides = [
  {
    title: "Getting Started",
    icon: "🚀",
    articles: 5,
    color: "bg-blue-100",
    link: "/sellers/resources/getting-started",
  },
  {
    title: "Product Listings",
    icon: "📦",
    articles: 8,
    color: "bg-green-100",
    link: "/sellers/resources/product-listings",
  },
  {
    title: "Order Management",
    icon: "📋",
    articles: 6,
    color: "bg-yellow-100",
    link: "/sellers/resources/orders",
  },
  {
    title: "Marketing Your Store",
    icon: "📢",
    articles: 10,
    color: "bg-purple-100",
    link: "/sellers/resources/marketing",
  },
];

// Featured articles
const featuredArticles = [
  {
    id: 1,
    title: "10 Tips to Increase Your Sales",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format&fit=crop",
    category: "Marketing",
    readTime: 8,
  },
  {
    id: 2,
    title: "How to Optimize Product Photos",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&auto=format&fit=crop",
    category: "Product",
    readTime: 6,
  },
  {
    id: 3,
    title: "Understanding Your Analytics Dashboard",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop",
    category: "Analytics",
    readTime: 10,
  },
  {
    id: 4,
    title: "Shipping Best Practices",
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&auto=format&fit=crop",
    category: "Fulfillment",
    readTime: 7,
  },
];

// Categories
const categories = [
  { name: "Account Setup", count: 12, icon: "🔧" },
  { name: "Product Management", count: 18, icon: "📦" },
  { name: "Order Fulfillment", count: 15, icon: "🚚" },
  { name: "Payments & Fees", count: 8, icon: "💰" },
  { name: "Marketing & Promotion", count: 22, icon: "📢" },
  { name: "Customer Service", count: 11, icon: "💬" },
  { name: "Policies & Guidelines", count: 9, icon: "📜" },
  { name: "Advanced Features", count: 14, icon: "⚙️" },
];

// Video tutorials
const videos = [
  {
    title: "Store Setup Walkthrough",
    duration: "10:23",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop",
    views: 1200,
  },
  {
    title: "Creating Your First Listing",
    duration: "5:45",
    thumbnail:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&auto=format&fit=crop",
    views: 2300,
  },
  {
    title: "Managing Inventory",
    duration: "8:12",
    thumbnail:
      "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=400&auto=format&fit=crop",
    views: 980,
  },
  {
    title: "Using Promotions Tools",
    duration: "6:30",
    thumbnail:
      "https://images.unsplash.com/photo-1556740772-1a741367b93e?w=400&auto=format&fit=crop",
    views: 1450,
  },
];

// Webinars
const webinars = [
  {
    title: "Seller Success Webinar: Boost Sales",
    date: "Feb 25, 2025",
    time: "2:00 PM EST",
    speaker: "Sarah Johnson",
    registerLink: "/webinars/feb25",
  },
  {
    title: "Advanced SEO for Your Listings",
    date: "Mar 2, 2025",
    time: "1:00 PM EST",
    speaker: "Michael Lee",
    registerLink: "/webinars/mar2",
  },
];

// Downloads
const downloads = [
  {
    name: "Seller Handbook (PDF)",
    size: "2.4 MB",
    icon: "📘",
    link: "/downloads/seller-handbook.pdf",
  },
  {
    name: "Product Photography Guide",
    size: "1.8 MB",
    icon: "📷",
    link: "/downloads/photography-guide.pdf",
  },
  {
    name: "Shipping Label Template",
    size: "0.5 MB",
    icon: "🏷️",
    link: "/downloads/shipping-template.xlsx",
  },
  {
    name: "Promotion Calendar 2025",
    size: "1.2 MB",
    icon: "📅",
    link: "/downloads/promo-calendar.pdf",
  },
];

// Case studies
const caseStudies = [
  {
    store: "TechGadget Co.",
    growth: "+150% sales in 6 months",
    category: "Electronics",
    link: "/case-studies/techgadget",
  },
  {
    store: "EcoHome",
    growth: "2x revenue",
    category: "Home & Garden",
    link: "/case-studies/ecohome",
  },
];

// Tools & calculators
const tools = [
  {
    name: "Profit Margin Calculator",
    icon: "🧮",
    link: "/tools/profit-calculator",
  },
  {
    name: "Shipping Cost Estimator",
    icon: "📦",
    link: "/tools/shipping-estimator",
  },
  {
    name: "Keyword Research Tool",
    icon: "🔍",
    link: "/tools/keyword-research",
  },
  { name: "Fee Calculator", icon: "💰", link: "/tools/fee-calculator" },
];

// Best practices (checklist style)
const bestPractices = [
  "Use high‑quality images (at least 5 per product)",
  "Write detailed, keyword‑rich descriptions",
  "Respond to customer inquiries within 24 hours",
  "Set competitive prices – check similar listings",
  "Offer multiple shipping options",
  "Collect and act on customer reviews",
];

export default function SellerResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#FF6600] to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Seller Success Center
          </h1>
          <p className="text-xl mb-6">
            Everything you need to grow your business on Unity Shop
          </p>
          <div className="max-w-2xl mx-auto relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="What do you want to learn?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </section>

      {/* Quick Start Guides */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Quick Start Guides</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickGuides.map((guide) => (
            <Link
              key={guide.title}
              href={guide.link}
              className={`${guide.color} p-6 rounded-lg shadow-sm hover:shadow-md transition`}
            >
              <div className="text-4xl mb-3">{guide.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{guide.title}</h3>
              <p className="text-sm text-gray-600">{guide.articles} articles</p>
              <span className="text-[#FF6600] text-sm mt-2 inline-block">
                Start here →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/sellers/resources/articles/${article.id}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
            >
              <div className="aspect-video relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <span className="text-xs text-[#FF6600] uppercase">
                  {article.category}
                </span>
                <h3 className="font-medium text-sm line-clamp-2 h-10 mt-1">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {article.readTime} min read
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/sellers/resources/category/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-sm flex items-center gap-2"
            >
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <p className="font-medium text-sm">{cat.name}</p>
                <p className="text-xs text-gray-500">{cat.count} articles</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Video Tutorials</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.map((video, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="aspect-video relative group cursor-pointer">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <FiPlay className="text-white text-3xl" />
                </div>
                <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="p-2">
                <h3 className="font-medium text-sm line-clamp-1">
                  {video.title}
                </h3>
                <p className="text-xs text-gray-500">{video.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Webinars & Events */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Upcoming Webinars</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {webinars.map((webinar, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3"
            >
              <FiCalendar className="text-[#FF6600] text-xl flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold">{webinar.title}</h3>
                <p className="text-sm text-gray-600">
                  {webinar.date} at {webinar.time}
                </p>
                <p className="text-xs text-gray-500">
                  Speaker: {webinar.speaker}
                </p>
                <Link
                  href={webinar.registerLink}
                  className="inline-block mt-2 text-sm text-[#FF6600] hover:underline"
                >
                  Register →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Downloads */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Downloads</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {downloads.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm flex items-center gap-2"
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.size}</p>
              </div>
              <FiDownload className="text-gray-400" size={16} />
            </a>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {caseStudies.map((cs, idx) => (
            <Link
              key={idx}
              href={cs.link}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition"
            >
              <p className="text-xs text-[#FF6600] uppercase">{cs.category}</p>
              <h3 className="font-semibold text-lg">{cs.store}</h3>
              <p className="text-sm text-gray-600 mt-1">{cs.growth}</p>
              <span className="text-sm text-[#FF6600] mt-2 inline-block">
                Read full story →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Tools & Calculators */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Tools & Calculators</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tools.map((tool, idx) => (
            <Link
              key={idx}
              href={tool.link}
              className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:shadow-sm"
            >
              <div className="text-3xl mb-2">{tool.icon}</div>
              <p className="text-sm font-medium">{tool.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Practices */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold mb-3">Seller Best Practices</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {bestPractices.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-green-500 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Community Forum */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">
            Connect with Other Sellers
          </h2>
          <p className="mb-4">
            Join our seller community to ask questions, share tips, and network.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/community"
              className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
            >
              Visit Forum
            </Link>
            <span className="text-sm self-center">Active discussions: 234</span>
          </div>
        </div>
      </section>

      {/* Help Center & Newsletter */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-200 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">
            Can't find what you're looking for?
          </h2>
          <p className="mb-4">
            Visit our full Help Center or get weekly tips in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/help"
              className="px-4 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
            >
              Help Center
            </Link>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded-l-md text-sm border-0 focus:outline-none w-64"
              />
              <button className="px-4 py-2 bg-gray-800 text-white rounded-r-md text-sm hover:bg-gray-900">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
