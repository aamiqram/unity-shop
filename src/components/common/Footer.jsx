import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { FiGlobe, FiDollarSign } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-white font-semibold mb-4">About Unity Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Buy on Unity Shop */}
          <div>
            <h3 className="text-white font-semibold mb-4">Buy on Unity Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/rfq" className="hover:text-white">
                  Request for Quotation
                </Link>
              </li>
              <li>
                <Link href="/trade-assurance" className="hover:text-white">
                  Trade Assurance
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white">
                  Product Categories
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white">
                  Search Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Sell on Unity Shop */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Sell on Unity Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sell/start" className="hover:text-white">
                  Start Selling
                </Link>
              </li>
              <li>
                <Link href="/seller-central" className="hover:text-white">
                  Seller Central
                </Link>
              </li>
              <li>
                <Link href="/become-verified" className="hover:text-white">
                  Become Verified
                </Link>
              </li>
              <li>
                <Link href="/seller-resources" className="hover:text-white">
                  Seller Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Help & Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/dispute" className="hover:text-white">
                  Dispute Resolution
                </Link>
              </li>
              <li>
                <Link href="/report-abuse" className="hover:text-white">
                  Report Abuse
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-white">
                  Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Connect With Us */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
            </div>
            <div className="mb-4">
              <p className="text-sm mb-2">Subscribe to our newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md text-sm">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="flex space-x-2">
              <a href="#" className="bg-gray-800 p-2 rounded hover:bg-gray-700">
                <FaApple size={24} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded hover:bg-gray-700">
                <FaGooglePlay size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm">© 2025 Unity Shop. All rights reserved.</div>
          <div className="flex space-x-6 text-sm mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <div className="flex items-center space-x-1">
              <FiGlobe />
              <select className="bg-transparent border-none text-sm">
                <option>English</option>
                <option>Spanish</option>
                <option>Chinese</option>
              </select>
            </div>
            <div className="flex items-center space-x-1">
              <FiDollarSign />
              <select className="bg-transparent border-none text-sm">
                <option>USD</option>
                <option>EUR</option>
                <option>CNY</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
