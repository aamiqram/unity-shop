// app/not-found.jsx
import Link from "next/link";
import { FiSearch, FiHome, FiPackage, FiHelpCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
        <div className="text-9xl font-bold text-[#FF6600] opacity-20">404</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">
          Oops! Page not found
        </h1>
        <p className="text-gray-600 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Helpful actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
          >
            <FiHome size={18} /> Go to Homepage
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            <FiPackage size={18} /> Browse Products
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            <FiHelpCircle size={18} /> Contact Support
          </Link>
        </div>

        {/* Search bar */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">
            Try searching for what you need:
          </p>
          <form action="/search" method="GET" className="flex">
            <input
              type="text"
              name="q"
              placeholder="Search products..."
              className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF6600] text-white rounded-r text-sm hover:bg-[#e65c00] flex items-center gap-1"
            >
              <FiSearch size={16} /> Search
            </button>
          </form>
        </div>

        {/* Popular pages */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/deals"
              className="text-sm text-[#FF6600] hover:underline"
            >
              Deals
            </Link>
            <Link
              href="/categories"
              className="text-sm text-[#FF6600] hover:underline"
            >
              Categories
            </Link>
            <Link
              href="/help"
              className="text-sm text-[#FF6600] hover:underline"
            >
              Help Center
            </Link>
            <Link
              href="/blog"
              className="text-sm text-[#FF6600] hover:underline"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
