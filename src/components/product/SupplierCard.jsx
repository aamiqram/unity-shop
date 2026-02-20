import Image from "next/image";
import Link from "next/link";
import { FiShield, FiMessageSquare, FiExternalLink } from "react-icons/fi";

export default function SupplierCard({ supplier }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
          <Image
            src={supplier.logo}
            alt={supplier.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold">{supplier.name}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <span>{supplier.location}</span>
            {supplier.tradeAssurance && (
              <span className="ml-2 text-orange-500" title="Trade Assurance">
                <FiShield size={16} />
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <div>
          <span className="text-gray-500">Years in Business:</span>
          <span className="ml-1 font-medium">{supplier.years}+</span>
        </div>
        <div>
          <span className="text-gray-500">Response Rate:</span>
          <span className="ml-1 font-medium">{supplier.responseRate}%</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button className="flex items-center justify-center border border-orange-500 text-orange-500 hover:bg-orange-50 py-2 rounded">
          <FiMessageSquare className="mr-2" /> Chat Now
        </button>
        <Link
          href={`/suppliers/${supplier.id}`}
          className="flex items-center justify-center text-gray-600 hover:text-gray-800"
        >
          Visit Store <FiExternalLink className="ml-1" />
        </Link>
      </div>
    </div>
  );
}
