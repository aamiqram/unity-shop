// components/common/Footer.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { FiMail, FiGlobe, FiDollarSign } from "react-icons/fi";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    if (email) {
      setNewsletterSubmitted(true);
      setEmail("");
      setTimeout(() => setNewsletterSubmitted(false), 3000);
    }
  };

  const footerSections = [
    {
      title: "About Unity Shop",
      links: [
        { label: "About Us", href: "/about" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Contact Us", href: "/contact" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Buy on Unity Shop",
      links: [
        { label: "Request for Quotation", href: "/rfq" },
        { label: "Trade Assurance", href: "/trade-assurance" },
        { label: "Product Categories", href: "/categories" },
        { label: "Search Products", href: "/search" },
      ],
    },
    {
      title: "Sell on Unity Shop",
      links: [
        { label: "Start Selling", href: "/become-seller" },
        { label: "Seller Central", href: "/dashboard/seller" },
        { label: "Become Verified", href: "/seller-verification" },
        { label: "Seller Resources", href: "/sellers/resources" },
      ],
    },
    {
      title: "Help & Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Dispute Resolution", href: "/disputes" },
        { label: "Report Abuse", href: "/report-abuse" },
        { label: "Policies", href: "/policies" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1-4: Link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4 text-lg">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-[#FF6600] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 5: Connect With Us */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">
              Connect With Us
            </h3>

            {/* Social media icons */}
            <div className="flex space-x-3 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF6600] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF6600] hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF6600] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF6600] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
            </div>

            {/* Newsletter signup */}
            <div className="mb-4">
              <label
                htmlFor="newsletter"
                className="block text-sm font-medium mb-2"
              >
                Subscribe to our newsletter
              </label>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  id="newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FF6600] text-white rounded-r-md hover:bg-[#e65c00] transition-colors"
                >
                  <FiMail size={18} />
                </button>
              </form>
              {newsletterSubmitted && (
                <p className="text-green-400 text-xs mt-1">
                  Thanks for subscribing!
                </p>
              )}
            </div>

            {/* App download buttons */}
            <div>
              <p className="text-sm font-medium mb-2">Download our app</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href="#"
                  className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  <FaApple size={20} />
                  <div className="text-xs">
                    <div>Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  <FaGooglePlay size={18} />
                  <div className="text-xs">
                    <div>Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-0">
            <span>
              &copy; {new Date().getFullYear()} Unity Shop. All rights reserved.
            </span>
            <Link href="/privacy" className="hover:text-[#FF6600]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#FF6600]">
              Terms of Service
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Language selector */}
            <div className="flex items-center gap-1">
              <FiGlobe size={16} />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
              >
                <option>English</option>
                <option>Español</option>
                <option>中文</option>
                <option>日本語</option>
              </select>
            </div>

            {/* Currency selector */}
            <div className="flex items-center gap-1">
              <FiDollarSign size={16} />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>CNY</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
