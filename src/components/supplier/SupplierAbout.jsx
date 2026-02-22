// components/supplier/SupplierAbout.jsx
import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";

const SupplierAbout = ({ supplier }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-3">Company Description</h3>
      <p className="text-gray-700 mb-6">{supplier.description}</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Certifications</h4>
          <ul className="space-y-1">
            {supplier.certifications.map((cert) => (
              <li
                key={cert}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <FiCheckCircle className="text-green-500" size={16} />
                {cert}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-2">Main Markets</h4>
          <ul className="space-y-1">
            {supplier.mainMarkets.map((market) => (
              <li key={market} className="text-sm text-gray-600">
                • {market}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Optional factory images placeholder */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-800 mb-2">Factory & Facilities</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-video bg-gray-200 rounded-md relative"
            >
              <Image
                src={`https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&auto=format&fit=crop&${i}`}
                alt={`Factory ${i}`}
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierAbout;
