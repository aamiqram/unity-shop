"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiGlobe,
  FiUser,
  FiShoppingCart,
  FiBell,
  FiSearch,
  FiChevronDown,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { usePathname } from "next/navigation";

const categories = [
  {
    id: 1,
    name: "Electronics",
    icon: "📱",
    image: "/images/cat-electronics.jpg",
    subcategories: [
      "Mobile Phones",
      "Laptops",
      "Cameras",
      "Audio",
      "Accessories",
    ],
  },
  {
    id: 2,
    name: "Fashion",
    icon: "👕",
    image: "/images/cat-fashion.jpg",
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      "Shoes",
      "Bags",
      "Watches",
    ],
  },
  // Add more categories as needed
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const pathname = usePathname();
  const navbarRef = useRef(null);
  const categoriesTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hover for mega menu
  const handleCategoryHover = (category) => {
    if (categoriesTimeout.current) clearTimeout(categoriesTimeout.current);
    setActiveCategory(category);
    setIsCategoriesOpen(true);
  };

  const handleCategoryLeave = () => {
    categoriesTimeout.current = setTimeout(() => {
      setIsCategoriesOpen(false);
      setActiveCategory(null);
    }, 200);
  };

  return (
    <header
      ref={navbarRef}
      className={`sticky top-0 z-50 w-full transition-shadow ${
        isScrolled ? "shadow-md bg-white" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: Logo + Categories + Search + Icons */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <Image
                src="/logo.svg" // You'll need to add a logo
                alt="Unity Shop"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl md:text-2xl text-gray-800">
              Unity Shop
            </span>
          </Link>

          {/* Categories button - desktop */}
          <div
            className="hidden md:block relative ml-4"
            onMouseEnter={() => handleCategoryHover(categories[0])}
            onMouseLeave={handleCategoryLeave}
          >
            <button className="flex items-center space-x-1 px-4 py-2 rounded-md hover:bg-gray-100">
              <span className="text-gray-700 font-medium">Categories</span>
              <FiChevronDown className="text-gray-500" />
            </button>
          </div>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6 relative">
            <div className="flex w-full border-2 border-orange-500 rounded-md overflow-hidden">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-gray-50 border-r border-gray-300 text-sm focus:outline-none"
              >
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Garden</option>
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="What are you looking for..."
                className="flex-1 px-4 py-2 focus:outline-none"
              />
              <button className="px-6 bg-orange-500 hover:bg-orange-600 text-white">
                <FiSearch size={20} />
              </button>
            </div>
            {/* Search suggestions */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
                <div className="p-2 text-sm text-gray-500">
                  Popular searches:
                </div>
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Smartphones
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Laptops
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Men's watches
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <button className="hidden md:flex items-center text-gray-700 hover:text-gray-900">
              <FiGlobe size={20} />
              <span className="ml-1 text-sm">EN</span>
            </button>
            <Link href="/account" className="text-gray-700 hover:text-gray-900">
              <FiUser size={22} />
            </Link>
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-gray-900"
            >
              <FiShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Link>
            <button className="relative text-gray-700 hover:text-gray-900 hidden md:block">
              <FiBell size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-3">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-3 py-2 focus:outline-none"
            />
            <button className="px-4 bg-orange-500 text-white">
              <FiSearch size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu - Desktop */}
      {isCategoriesOpen && (
        <div
          className="hidden md:block absolute left-0 right-0 bg-white shadow-lg border-t"
          onMouseEnter={() => {
            if (categoriesTimeout.current)
              clearTimeout(categoriesTimeout.current);
          }}
          onMouseLeave={handleCategoryLeave}
        >
          <div className="max-w-7xl mx-auto px-8 py-6 flex">
            {/* Left column: main categories */}
            <div className="w-1/4 border-r pr-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                All Categories
              </h3>
              <ul>
                {categories.map((cat) => (
                  <li
                    key={cat.id}
                    onMouseEnter={() => setActiveCategory(cat)}
                    className={`py-2 px-3 rounded cursor-pointer flex items-center justify-between ${
                      activeCategory?.id === cat.id
                        ? "bg-orange-50 text-orange-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span>
                      <span className="mr-2">{cat.icon}</span> {cat.name}
                    </span>
                    <FiChevronDown className="rotate-[-90deg] text-xs" />
                  </li>
                ))}
              </ul>
            </div>
            {/* Right column: subcategories grid */}
            {activeCategory && (
              <div className="w-3/4 pl-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 mr-4 rounded overflow-hidden">
                    <Image
                      src={activeCategory.image}
                      alt={activeCategory.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{activeCategory.name}</h4>
                    <Link
                      href={`/categories/${activeCategory.id}`}
                      className="text-orange-500 text-sm"
                    >
                      View All
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {activeCategory.subcategories.map((sub, idx) => (
                    <Link
                      key={idx}
                      href={`/categories/${activeCategory.id}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-700 hover:text-orange-500"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile slide-out menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white p-4 overflow-y-auto">
            <button onClick={() => setIsMenuOpen(false)} className="mb-4">
              <FiX size={24} />
            </button>
            <nav className="space-y-2">
              <Link href="/categories" className="block py-2 font-medium">
                Categories
              </Link>
              <Link href="/account" className="block py-2">
                Account
              </Link>
              <Link href="/orders" className="block py-2">
                Orders
              </Link>
              <Link href="/help" className="block py-2">
                Help
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
