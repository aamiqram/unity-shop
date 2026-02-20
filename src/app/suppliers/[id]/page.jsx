import Image from "next/image";
import Link from "next/link";
import {
  FiShield,
  FiMapPin,
  FiCalendar,
  FiMessageSquare,
  FiExternalLink,
} from "react-icons/fi";
import ProductCardB2B from "@/components/product/ProductCardB2B";

// Mock supplier data
const supplier = {
  id: 1,
  name: "Shenzhen Tech Co.",
  logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  cover:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
  location: "Shenzhen, China",
  years: 8,
  tradeAssurance: true,
  stats: {
    products: 245,
    responseTime: "Within 2 hours",
    responseRate: 95,
    transactions: "12.5K+",
  },
  about:
    "Shenzhen Tech Co. is a leading manufacturer of consumer electronics, specializing in smartphones, tablets, and accessories. We have 8 years of experience and a dedicated R&D team.",
  certifications: ["ISO 9001", "CE", "RoHS"],
  products: [
    // reuse from demoProducts
  ],
};

export default function SupplierPage({ params }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cover & Logo */}
      <div className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-16">
        <Image src={supplier.cover} alt="Cover" fill className="object-cover" />
        <div className="absolute -bottom-12 left-6 flex items-end">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden bg-white">
            <Image
              src={supplier.logo}
              alt={supplier.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="ml-4 mb-2 text-white drop-shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold">{supplier.name}</h1>
            <div className="flex items-center text-sm">
              <FiMapPin className="mr-1" /> {supplier.location}
              {supplier.tradeAssurance && (
                <span className="ml-3 flex items-center bg-orange-500 text-white px-2 py-0.5 rounded text-xs">
                  <FiShield className="mr-1" /> Trade Assurance
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mb-6">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center">
          <FiMessageSquare className="mr-2" /> Contact Supplier
        </button>
        <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md flex items-center">
          <FiExternalLink className="mr-2" /> Visit Website
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg mb-8">
        <div className="text-center">
          <div className="text-2xl font-bold">{supplier.stats.products}</div>
          <div className="text-sm text-gray-500">Products</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">
            {supplier.stats.responseTime}
          </div>
          <div className="text-sm text-gray-500">Response Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">
            {supplier.stats.responseRate}%
          </div>
          <div className="text-sm text-gray-500">Response Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">
            {supplier.stats.transactions}
          </div>
          <div className="text-sm text-gray-500">Transactions</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          <button className="py-2 border-b-2 border-orange-500 text-orange-500 font-medium">
            Products
          </button>
          <button className="py-2 text-gray-500 hover:text-gray-700">
            About Company
          </button>
          <button className="py-2 text-gray-500 hover:text-gray-700">
            Reviews & Ratings
          </button>
          <button className="py-2 text-gray-500 hover:text-gray-700">
            Contact Information
          </button>
        </nav>
      </div>

      {/* Products Tab Content */}
      <div className="py-6">
        <h2 className="text-xl font-bold mb-4">All Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {supplier.products.map((product) => (
            <ProductCardB2B key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
