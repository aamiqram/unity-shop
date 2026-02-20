"use client";
import { useState } from "react";
import Link from "next/link";
import { FiX, FiStar, FiCheck, FiMinus } from "react-icons/fi";

const mockProducts = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    brand: "SoundMaster",
    price: 79.99,
    rating: 4.5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1606741965583-5c4b0a5e4b0a?w=200",
    specs: {
      battery: "8 hours",
      waterResistant: true,
      noiseCancelling: true,
      wirelessCharging: true,
    },
  },
  {
    id: 2,
    name: "Wireless Earbuds Lite",
    brand: "AudioTech",
    price: 49.99,
    rating: 4.2,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1606741965583-5c4b0a5e4b0a?w=200",
    specs: {
      battery: "5 hours",
      waterResistant: true,
      noiseCancelling: false,
      wirelessCharging: false,
    },
  },
  {
    id: 3,
    name: "Sport Earbuds",
    brand: "FitGear",
    price: 59.99,
    rating: 4.4,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1606741965583-5c4b0a5e4b0a?w=200",
    specs: {
      battery: "6 hours",
      waterResistant: true,
      noiseCancelling: false,
      wirelessCharging: true,
    },
  },
];

export default function ComparePage() {
  const [products, setProducts] = useState(mockProducts);

  const removeProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const allSpecs = [
    { key: "battery", label: "Battery Life" },
    { key: "waterResistant", label: "Water Resistant" },
    { key: "noiseCancelling", label: "Noise Cancelling" },
    { key: "wirelessCharging", label: "Wireless Charging" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Compare Products</h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No products to compare</p>
          <Link href="/" className="bg-orange text-white px-6 py-2 rounded-lg">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="p-4 bg-gray-50 border"></th>
                {products.map((p) => (
                  <th key={p.id} className="p-4 bg-gray-50 border relative">
                    <button
                      onClick={() => removeProduct(p.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    >
                      <FiX />
                    </button>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-32 h-32 object-cover mx-auto mb-2"
                    />
                    <Link
                      href={`/products/${p.id}`}
                      className="font-medium hover:text-orange"
                    >
                      {p.name}
                    </Link>
                    <p className="text-sm text-gray-500">{p.brand}</p>
                    <p className="text-orange font-bold mt-1">${p.price}</p>
                    <div className="flex items-center justify-center text-sm">
                      <FiStar className="text-yellow-400 fill-current mr-1" />{" "}
                      {p.rating} ({p.reviews})
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allSpecs.map((spec) => (
                <tr key={spec.key}>
                  <td className="p-4 border font-medium">{spec.label}</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-4 border text-center">
                      {typeof p.specs[spec.key] === "boolean" ? (
                        p.specs[spec.key] ? (
                          <FiCheck className="text-green-500 mx-auto" />
                        ) : (
                          <FiMinus className="text-gray-300 mx-auto" />
                        )
                      ) : (
                        p.specs[spec.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 text-center">
        <button className="border border-orange text-orange px-6 py-2 rounded-lg hover:bg-orange/10">
          Add Another Product
        </button>
      </div>
    </div>
  );
}
