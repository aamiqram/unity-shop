// components/product/SupplierCard.jsx
import Image from "next/image";
import Link from "next/link";
import { FiMessageSquare, FiCheckCircle, FiAward } from "react-icons/fi";

const SupplierCard = ({ supplier }) => {
  const {
    name,
    logo,
    location,
    flag,
    yearsInBusiness,
    responseRate,
    tradeAssurance,
    verified,
  } = supplier;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-24">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
          {logo ? (
            <Image
              src={logo}
              alt={name}
              width={48}
              height={48}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <div className="flex items-center text-xs text-gray-500 gap-1">
            <span>{flag}</span>
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {verified && (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            <FiCheckCircle size={12} />
            Verified
          </span>
        )}
        {tradeAssurance && (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            <FiAward size={12} />
            Trade Assurance
          </span>
        )}
        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
          {yearsInBusiness}+ yrs
        </span>
        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
          {responseRate}% Response
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <div>
          <p className="text-gray-500 text-xs">Response Time</p>
          <p className="font-medium">Within 2h</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Total Products</p>
          <p className="font-medium">128</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Total Transactions</p>
          <p className="font-medium">5,200+</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Followed by</p>
          <p className="font-medium">3.4k</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-2">
        <button className="w-full bg-[#FF6600] text-white py-2 rounded-md hover:bg-[#e65c00] transition-colors flex items-center justify-center gap-2">
          <FiMessageSquare size={18} />
          Chat Now
        </button>
        <Link
          href={`/suppliers/${name.toLowerCase().replace(/\s+/g, "-")}`}
          className="block w-full text-center border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          Visit Store
        </Link>
      </div>
    </div>
  );
};

export default SupplierCard;
