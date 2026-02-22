// src/components/common/Navbar.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiBell,
  FiGlobe,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state

  const categoriesRef = useRef(null);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);
  const pathname = usePathname();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setIsCategoriesOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll effect (optional sticky)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Dummy categories data for mega menu
  const categories = [
    {
      name: "Electronics",
      icon: "📱",
      subcategories: [
        "Mobile Phones",
        "Laptops & Computers",
        "Cameras",
        "Audio & Headphones",
        "Wearable Technology",
        "TV & Home Entertainment",
        "Video Games",
        "Electronic Components",
      ],
    },
    {
      name: "Fashion",
      icon: "👕",
      subcategories: [
        "Men's Clothing",
        "Women's Clothing",
        "Kids' Fashion",
        "Shoes",
        "Bags & Accessories",
        "Watches",
        "Jewelry",
        "Fashion Accessories",
      ],
    },
    {
      name: "Home & Garden",
      icon: "🏠",
      subcategories: [
        "Furniture",
        "Home Decor",
        "Kitchen & Dining",
        "Bedding & Linens",
        "Bathroom",
        "Garden & Outdoor",
        "Tools & DIY",
        "Lighting",
      ],
    },
    {
      name: "Health & Beauty",
      icon: "💄",
      subcategories: [
        "Makeup",
        "Skincare",
        "Hair Care",
        "Fragrances",
        "Personal Care",
        "Health Supplements",
        "Medical Supplies",
        "Fitness Equipment",
      ],
    },
    {
      name: "Sports & Outdoors",
      icon: "⚽",
      subcategories: [
        "Sports Clothing",
        "Sports Shoes",
        "Fitness Equipment",
        "Camping & Hiking",
        "Cycling",
        "Water Sports",
        "Team Sports",
        "Outdoor Recreation",
      ],
    },
    {
      name: "Toys & Kids",
      icon: "🧸",
      subcategories: [
        "Action Figures",
        "Dolls & Playsets",
        "Educational Toys",
        "Baby & Toddler",
        "Outdoor Play",
        "Puzzles & Games",
        "Arts & Crafts",
        "Stuffed Animals",
      ],
    },
    {
      name: "Automotive",
      icon: "🚗",
      subcategories: [
        "Car Parts",
        "Motorcycle Parts",
        "Tools & Equipment",
        "Car Care",
        "Interior Accessories",
        "Exterior Accessories",
        "Tires & Wheels",
        "Automotive Electronics",
      ],
    },
    {
      name: "Office Supplies",
      icon: "📎",
      subcategories: [
        "Stationery",
        "Office Furniture",
        "Printers & Supplies",
        "Writing Instruments",
        "Paper Products",
        "Binders & Filing",
        "Calendars & Planners",
        "Shipping Supplies",
      ],
    },
  ];

  // Dummy search suggestions
  const suggestions = [
    "iPhone 15",
    "Laptop gaming",
    "Nike shoes",
    "Smart watch",
    "Wireless headphones",
    "Office chair",
    "Drone",
  ].filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));

  // Cart item count
  const cartItemCount = 3; // Dummy

  return (
    <header
      className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Main navbar row */}
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and mobile menu button */}
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#FF6600]">Unity</span>
              <span className="text-2xl font-bold text-gray-800">Shop</span>
            </Link>
          </div>

          {/* Desktop: Categories dropdown */}
          <div className="hidden lg:flex items-center" ref={categoriesRef}>
            <button
              className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-[#FF6600] font-medium"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              onMouseEnter={() => setIsCategoriesOpen(true)}
            >
              <span>Categories</span>
              <FiChevronDown
                className={`transition-transform ${
                  isCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {/* Mega menu */}
            {isCategoriesOpen && (
              <div
                className="absolute left-0 top-16 w-full bg-white border-t border-gray-200 shadow-lg"
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <div className="container mx-auto px-4 py-6">
                  <div className="grid grid-cols-4 gap-6">
                    {categories.map((category) => (
                      <div key={category.name}>
                        <Link
                          href={`/category/${category.name.toLowerCase()}`}
                          className="flex items-center gap-2 text-gray-800 font-semibold hover:text-[#FF6600] mb-2"
                        >
                          <span className="text-xl">{category.icon}</span>
                          <span>{category.name}</span>
                        </Link>
                        <ul className="space-y-1">
                          {category.subcategories.slice(0, 4).map((sub) => (
                            <li key={sub}>
                              <Link
                                href={`/category/${category.name.toLowerCase()}/${sub
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                className="text-sm text-gray-600 hover:text-[#FF6600]"
                              >
                                {sub}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search bar - desktop */}
          <div
            className="hidden lg:flex flex-1 max-w-2xl mx-4 relative"
            ref={searchRef}
          >
            <div className="flex w-full border border-gray-300 rounded-md overflow-hidden focus-within:border-[#FF6600] focus-within:ring-1 focus-within:ring-[#FF6600]">
              {/* Category dropdown inside search */}
              <div className="relative">
                <button
                  className="flex items-center gap-1 h-10 px-3 bg-gray-100 text-sm text-gray-700 border-r border-gray-300 hover:bg-gray-200"
                  onClick={() => {}}
                >
                  <span>{selectedCategory}</span>
                  <FiChevronDown size={16} />
                </button>
                {/* Simple category dropdown (you can expand later) */}
              </div>
              <input
                type="text"
                placeholder="What are you looking for?"
                className="flex-1 h-10 px-3 outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              <button className="h-10 px-4 bg-[#FF6600] text-white hover:bg-[#e65c00] flex items-center justify-center">
                <FiSearch size={20} />
              </button>
            </div>
            {/* Search suggestions dropdown */}
            {isSearchFocused && searchQuery && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="py-2">
                  {suggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <Link
                        href={`/search?q=${encodeURIComponent(suggestion)}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsSearchFocused(false)}
                      >
                        {suggestion}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Language selector */}
            <button className="hidden sm:flex items-center gap-1 p-2 text-gray-700 hover:text-[#FF6600]">
              <FiGlobe size={20} />
              <span className="text-sm hidden md:inline">EN</span>
            </button>

            {/* User account */}
            <div className="relative" ref={userMenuRef}>
              <button
                className="flex items-center gap-1 p-2 text-gray-700 hover:text-[#FF6600]"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <FiUser size={20} />
                <span className="text-sm hidden md:inline">
                  {isLoggedIn ? "Account" : "Sign In"}
                </span>
                <FiChevronDown size={16} className="hidden md:inline" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <Link
                        href="/wishlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Wishlist
                      </Link>
                      <hr className="my-1" />
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setIsLoggedIn(false);
                          setIsUserMenuOpen(false);
                        }}
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Notifications bell */}
            <button className="hidden sm:block p-2 text-gray-700 hover:text-[#FF6600] relative">
              <FiBell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-[#FF6600]"
            >
              <FiShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6600] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile search bar (visible below md) */}
        <div className="lg:hidden py-2">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 h-10 px-3 outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="h-10 px-4 bg-[#FF6600] text-white hover:bg-[#e65c00] flex items-center justify-center">
              <FiSearch size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="fixed left-0 top-0 bottom-0 w-4/5 max-w-sm bg-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-xl font-bold text-[#FF6600]">Unity</span>
                <span className="text-xl font-bold text-gray-800">Shop</span>
              </Link>
              <button onClick={() => setIsMenuOpen(false)}>
                <FiX size={24} />
              </button>
            </div>
            <nav className="p-4">
              {/* Mobile categories accordion */}
              <div className="mb-4">
                <div className="font-semibold text-gray-800 mb-2">
                  Categories
                </div>
                {categories.map((category) => (
                  <div key={category.name} className="mb-2">
                    <details className="group">
                      <summary className="flex items-center gap-2 py-2 text-gray-700 cursor-pointer">
                        <span className="text-lg">{category.icon}</span>
                        <span className="flex-1">{category.name}</span>
                        <FiChevronDown className="group-open:rotate-180 transition-transform" />
                      </summary>
                      <ul className="ml-6 mt-1 space-y-1">
                        {category.subcategories.map((sub) => (
                          <li key={sub}>
                            <Link
                              href={`/category/${category.name.toLowerCase()}/${sub
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="block py-1 text-sm text-gray-600 hover:text-[#FF6600]"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                ))}
              </div>

              {/* Mobile menu links */}
              <div className="border-t border-gray-200 pt-4">
                <Link
                  href="/deals"
                  className="block py-2 text-gray-700 hover:text-[#FF6600]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Deals
                </Link>
                <Link
                  href="/help"
                  className="block py-2 text-gray-700 hover:text-[#FF6600]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Help Center
                </Link>
                <Link
                  href="/become-seller"
                  className="block py-2 text-gray-700 hover:text-[#FF6600]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Become a Seller
                </Link>
              </div>

              {/* Mobile auth buttons */}
              <div className="border-t border-gray-200 mt-4 pt-4 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block py-2 text-gray-700 hover:text-[#FF6600]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      className="block py-2 text-left text-gray-700 hover:text-[#FF6600]"
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="bg-[#FF6600] text-white text-center py-2 rounded-md hover:bg-[#e65c00]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="border border-gray-300 text-center py-2 rounded-md hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
