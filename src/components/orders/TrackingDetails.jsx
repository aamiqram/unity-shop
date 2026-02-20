import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiPackage, FiMessageSquare } from "react-icons/fi";

export default function TrackingDetails({ address, items }) {
  return (
    <div className="space-y-6">
      {/* Delivery address */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-3">
          <FiMapPin className="text-orange mr-2" />
          <h3 className="font-semibold">Delivery Address</h3>
        </div>
        <p className="text-sm">
          {address.name}
          <br />
          {address.line1}
          {address.line2 && `, ${address.line2}`}
          <br />
          {address.city}, {address.state} {address.zip}
          <br />
          {address.country}
        </p>
      </div>

      {/* Items in this order */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-3">
          <FiPackage className="text-orange mr-2" />
          <h3 className="font-semibold">Items in this Order</h3>
        </div>
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded mr-3"
              />
              <div className="flex-1">
                <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact seller button */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="font-semibold mb-3">Need Help?</h3>
        <button className="w-full bg-orange text-white py-2 rounded-lg flex items-center justify-center hover:bg-orange/90">
          <FiMessageSquare className="mr-2" /> Contact Seller
        </button>
        <button className="w-full border border-gray-300 py-2 rounded-lg mt-2 hover:bg-gray-50">
          Report a Problem
        </button>
      </div>
    </div>
  );
}
