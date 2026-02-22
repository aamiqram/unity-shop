// app/compare/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { demoProducts } from "@/lib/demoProducts";
import { FiX, FiPlus, FiShoppingCart, FiStar } from "react-icons/fi";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids")?.split(",") || [];
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Load products from demo data
  useEffect(() => {
    const selected = demoProducts.filter((p) => ids.includes(p.id));
    setProducts(selected.slice(0, 4)); // max 4
  }, [ids]);

  const removeProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Filter available products for adding (not already in comparison)
  const availableProducts = demoProducts.filter(
    (p) => !products.some((sp) => sp.id === p.id),
  );

  const filteredAvailable = availableProducts.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const addProduct = (product) => {
    if (products.length < 4) {
      setProducts([...products, product]);
      setShowAddModal(false);
      setSearchQuery("");
    }
  };

  // All possible specification keys (gather from all products)
  const allSpecs = [
    "Brand",
    "Model",
    "SKU",
    "Category",
    "Price",
    "MOQ",
    "Rating",
    "Reviews",
    "Stock Status",
    "Shipping Cost",
    "Delivery Time",
    "Seller Name",
    "Seller Location",
    "Trade Assurance",
    "Verified",
  ];

  // Helper to get value for a spec key
  const getSpecValue = (product, key) => {
    switch (key) {
      case "Brand":
        return product.brand || "N/A";
      case "Model":
        return product.model || "N/A";
      case "SKU":
        return product.sku || `SKU-${product.id}`;
      case "Category":
        return product.category;
      case "Price":
        return `$${product.priceMin} - $${product.priceMax}`;
      case "MOQ":
        return `${product.moq} pieces`;
      case "Rating":
        return product.rating ? `${product.rating} ★` : "N/A";
      case "Reviews":
        return product.reviews || 0;
      case "Stock Status":
        return product.inStock ? "In Stock" : "Out of Stock";
      case "Shipping Cost":
        return product.shippingCost ? `$${product.shippingCost}` : "Varies";
      case "Delivery Time":
        return product.deliveryTime || "3-7 days";
      case "Seller Name":
        return product.supplier.name;
      case "Seller Location":
        return product.supplier.location;
      case "Trade Assurance":
        return product.supplier.tradeAssurance ? "Yes" : "No";
      case "Verified":
        return product.supplier.verified ? "Yes" : "No";
      default:
        return "—";
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Compare Products
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-4">No products to compare.</p>
            <Link
              href="/products"
              className="inline-block px-6 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            {/* Sticky header with product cards */}
            <div className="sticky top-16 z-30 bg-white border border-gray-200 rounded-t-lg shadow-sm mb-4">
              <div className="grid grid-cols-[200px_1fr_1fr_1fr_1fr] lg:grid-cols-[250px_repeat(4,1fr)] overflow-x-auto">
                {/* Empty top-left cell */}
                <div className="p-4 border-r border-gray-200 bg-gray-50 font-medium text-gray-700">
                  Products
                </div>
                {/* Product cards */}
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 border-r border-gray-200 last:border-r-0 relative"
                  >
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                    >
                      <FiX size={18} />
                    </button>
                    <div className="aspect-square w-24 mx-auto mb-2">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={96}
                        height={96}
                        className="object-cover rounded"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-center line-clamp-2 h-10">
                      {product.title}
                    </h3>
                    <p className="text-[#FF6600] font-bold text-center mt-1">
                      ${product.priceMin}
                    </p>
                    <button className="w-full mt-2 py-1 bg-[#FF6600] text-white rounded text-xs hover:bg-[#e65c00] flex items-center justify-center gap-1">
                      <FiShoppingCart size={12} /> Add to Cart
                    </button>
                  </div>
                ))}
                {/* Add product placeholder if less than 4 */}
                {products.length < 4 && (
                  <div className="p-4 border-r border-gray-200 flex items-center justify-center">
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="flex flex-col items-center text-gray-400 hover:text-[#FF6600]"
                    >
                      <FiPlus size={32} />
                      <span className="text-xs mt-1">Add Product</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Highlight differences toggle */}
            <div className="flex justify-end mb-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={highlightDifferences}
                  onChange={(e) => setHighlightDifferences(e.target.checked)}
                  className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
                />
                Highlight differences
              </label>
            </div>

            {/* Comparison table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {allSpecs.map((spec) => {
                    const values = products.map((p) => getSpecValue(p, spec));
                    const allEqual = values.every((v) => v === values[0]);
                    const shouldHighlight = highlightDifferences && !allEqual;

                    return (
                      <tr
                        key={spec}
                        className="border-b border-gray-200 last:border-0"
                      >
                        <td className="p-3 font-medium bg-gray-50 sticky left-0 bg-opacity-90">
                          {spec}
                        </td>
                        {products.map((product, idx) => (
                          <td
                            key={product.id}
                            className={`p-3 border-r border-gray-200 last:border-r-0 ${
                              shouldHighlight ? "bg-yellow-50" : ""
                            }`}
                          >
                            {values[idx]}
                          </td>
                        ))}
                        {products.length < 4 &&
                          Array(4 - products.length)
                            .fill()
                            .map((_, i) => (
                              <td
                                key={i}
                                className="p-3 border-r border-gray-200 text-gray-300"
                              >
                                —
                              </td>
                            ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Add product modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Add Product to Compare</h2>
              <button onClick={() => setShowAddModal(false)}>
                <FiX size={20} />
              </button>
            </div>
            <div className="p-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              />
              <div className="grid grid-cols-2 gap-3">
                {filteredAvailable.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addProduct(product)}
                    className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:border-[#FF6600]"
                  >
                    <div className="w-12 h-12 relative">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-medium line-clamp-2">
                        {product.title}
                      </p>
                      <p className="text-xs text-[#FF6600]">
                        ${product.priceMin}
                      </p>
                    </div>
                  </button>
                ))}
                {filteredAvailable.length === 0 && (
                  <p className="col-span-2 text-center text-gray-500 py-4">
                    No more products available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
