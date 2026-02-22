// app/sitemap-page/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

// Define all site links by category
const siteLinks = [
  {
    category: "Shop",
    links: [
      { href: "/", label: "Home" },
      { href: "/products", label: "All Products" },
      { href: "/categories", label: "Categories" },
      { href: "/deals", label: "Deals & Promotions" },
      { href: "/flash-sales", label: "Flash Sales" },
      { href: "/new-arrivals", label: "New Arrivals" },
      { href: "/best-sellers", label: "Best Sellers" },
    ],
  },
  {
    category: "Account",
    links: [
      { href: "/login", label: "Login" },
      { href: "/register", label: "Register" },
      { href: "/forgot-password", label: "Forgot Password" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/dashboard/orders", label: "My Orders" },
      { href: "/dashboard/wishlist", label: "Wishlist" },
      { href: "/dashboard/addresses", label: "Addresses" },
      { href: "/dashboard/profile", label: "Profile Settings" },
      { href: "/dashboard/reviews", label: "Reviews" },
      { href: "/dashboard/messages", label: "Messages" },
    ],
  },
  {
    category: "For Sellers",
    links: [
      { href: "/become-seller", label: "Become a Seller" },
      { href: "/sellers/login", label: "Seller Login" },
      { href: "/dashboard/seller", label: "Seller Dashboard" },
      { href: "/dashboard/seller/products", label: "Manage Products" },
      { href: "/dashboard/seller/orders", label: "Manage Orders" },
      { href: "/dashboard/seller/analytics", label: "Analytics" },
      { href: "/dashboard/seller/settings", label: "Store Settings" },
      { href: "/sellers/resources", label: "Seller Resources" },
      { href: "/sellers/pricing", label: "Pricing Plans" },
    ],
  },
  {
    category: "Support",
    links: [
      { href: "/help", label: "Help Center" },
      { href: "/contact", label: "Contact Us" },
      { href: "/faq", label: "FAQ" },
      { href: "/shipping-policy", label: "Shipping Policy" },
      { href: "/returns-policy", label: "Return Policy" },
      { href: "/track-order", label: "Track Order" },
    ],
  },
  {
    category: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
      { href: "/careers", label: "Careers" },
      { href: "/press", label: "Press/Media" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/partnerships", label: "Partnerships" },
    ],
  },
  {
    category: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
  {
    category: "Other",
    links: [
      { href: "/gift-cards", label: "Gift Cards" },
      { href: "/referral", label: "Referral Program" },
      { href: "/rewards", label: "Loyalty Rewards" },
      { href: "/sitemap-page", label: "Sitemap" },
    ],
  },
];

export default function SitemapPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = siteLinks
    .map((cat) => ({
      ...cat,
      links: cat.links.filter((link) =>
        link.label.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.links.length > 0);

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Sitemap
          </h1>
          <p className="text-gray-600 mb-4">
            Navigate all pages on Unity Shop. Use the search to quickly find
            what you need.
          </p>

          {/* Search input */}
          <div className="mb-6 relative max-w-md">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
            />
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <div key={category.category}>
                <h2 className="font-semibold text-lg text-gray-800 mb-2">
                  {category.category}
                </h2>
                <ul className="space-y-1">
                  {category.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-[#FF6600] hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No pages match your search.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
