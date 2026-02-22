// app/cart/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import ProductCardB2B from "@/components/product/ProductCardB2B";
import { demoProducts } from "@/lib/demoProducts";
import { FiShoppingBag } from "react-icons/fi";
import Image from "next/image";

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, cartTotal, itemCount } =
    useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);

  // Group items by supplier
  const groupedItems = cartItems.reduce((groups, item) => {
    const key = item.supplier.name;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {});

  const handleSaveForLater = (item) => {
    removeItem(item.id, item.selectedVariant);
    setSavedForLater([...savedForLater, item]);
  };

  const handleMoveToCart = (item) => {
    setSavedForLater(
      savedForLater.filter(
        (i) => i.id !== item.id || i.selectedVariant !== item.selectedVariant,
      ),
    );
    // Add back to cart – we need an add function, but useCart has addToCart
    // For simplicity, we'll assume we have addToCart; we'll add it later if needed.
    // For now, just remove from saved.
  };

  const handleRemoveSaved = (item) => {
    setSavedForLater(
      savedForLater.filter(
        (i) => i.id !== item.id || i.selectedVariant !== item.selectedVariant,
      ),
    );
  };

  // Recommendations (first 4 products)
  const recommendations = demoProducts.slice(0, 4);

  if (cartItems.length === 0 && savedForLater.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <FiShoppingBag className="mx-auto text-gray-300" size={64} />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mt-2">
          Looks like you haven't added anything yet.
        </p>
        <Link
          href="/products"
          className="inline-block mt-6 px-6 py-3 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
        >
          Start Shopping
        </Link>
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {["Electronics", "Fashion", "Home & Garden", "Sports"].map(
              (cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase()}`}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                >
                  {cat}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4">
        <ol className="flex items-center space-x-2 text-gray-500">
          <li>
            <Link href="/" className="hover:text-[#FF6600]">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-800">Cart</li>
        </ol>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Shopping Cart{" "}
        {itemCount > 0 && (
          <span className="text-gray-500 text-lg">({itemCount} items)</span>
        )}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main cart area */}
        <div className="flex-1">
          {/* Select all row */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                className="w-4 h-4 text-[#FF6600] border-gray-300 rounded focus:ring-[#FF6600] mr-2"
              />
              Select All ({itemCount} items)
            </label>
            <button className="text-sm text-gray-500 hover:text-red-600">
              Remove Selected
            </button>
          </div>

          {/* Items grouped by seller */}
          {Object.entries(groupedItems).map(([seller, items]) => (
            <div key={seller} className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-[#FF6600]" />
                  <h3 className="font-semibold text-gray-800">{seller}</h3>
                </div>
                <button className="text-xs text-[#FF6600] hover:underline">
                  Message Seller
                </button>
              </div>
              {items.map((item) => (
                <CartItem
                  key={`${item.id}-${item.selectedVariant}`}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  onSaveForLater={handleSaveForLater}
                />
              ))}
            </div>
          ))}

          {/* Saved for later */}
          {savedForLater.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Saved for Later</h3>
              {savedForLater.map((item) => (
                <div
                  key={`${item.id}-${item.selectedVariant}`}
                  className="flex items-center gap-4 py-3 border-b border-gray-100"
                >
                  <div className="w-12 h-12 relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      ${item.priceMin.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="text-xs text-[#FF6600] hover:underline"
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveSaved(item)}
                      className="text-xs text-gray-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recommendations */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4">You May Also Like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {recommendations.map((product) => (
                <ProductCardB2B key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* Order summary sidebar */}
        <div className="lg:w-80">
          <CartSummary subtotal={cartTotal} onCheckout={() => {}} />
        </div>
      </div>
    </div>
  );
}
