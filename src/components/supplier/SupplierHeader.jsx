// components/supplier/SupplierHeader.jsx
import Image from "next/image";
import Link from "next/link";
import {
  FiMessageSquare,
  FiExternalLink,
  FiCheckCircle,
  FiAward,
} from "react-icons/fi";

const SupplierHeader = ({ supplier }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
      {/* Cover image */}
      <div className="relative h-40 md:h-56 w-full bg-gray-200">
        <Image
          src={supplier.coverImage}
          alt={`${supplier.name} cover`}
          fill
          className="object-cover"
        />
      </div>

      {/* Logo and info */}
      <div className="px-4 sm:px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-12 mb-4">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden mb-4 sm:mb-0 sm:mr-4">
            <Image
              src={supplier.logo}
              alt={supplier.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {supplier.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <span className="flex items-center text-gray-600">
                <span className="mr-1">{supplier.flag}</span>{" "}
                {supplier.location}
              </span>
              {supplier.verified && (
                <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">
                  <FiCheckCircle size={14} />
                  Verified Supplier
                </span>
              )}
              {supplier.tradeAssurance && (
                <span className="inline-flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-xs">
                  <FiAward size={14} />
                  Trade Assurance
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <button className="flex items-center gap-1 bg-[#FF6600] text-white px-4 py-2 rounded-md hover:bg-[#e65c00] transition">
              <FiMessageSquare size={18} />
              Contact Supplier
            </button>
            {supplier.contact.website && (
              <a
                href={`https://${supplier.contact.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition"
              >
                <FiExternalLink size={18} />
                Website
              </a>
            )}
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-gray-100">
          <div>
            <p className="text-gray-500 text-xs">Total Products</p>
            <p className="font-semibold text-lg">{supplier.totalProducts}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Response Time</p>
            <p className="font-semibold text-lg">{supplier.responseTime}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Response Rate</p>
            <p className="font-semibold text-lg">{supplier.responseRate}%</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Total Transactions</p>
            <p className="font-semibold text-lg">
              {supplier.totalTransactions.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierHeader;
