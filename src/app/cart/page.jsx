"use client";
import { useState } from "react";
import Link from "next/link";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { FiShoppingCart } from "react-icons/fi";

// Mock initial cart data – in real app fetch from API/context
const initialCartData = [
  {
    sellerId: "s1",
    sellerName: "TechCorp Ltd.",
    messageSeller: true,
    items: [
      {
        id: "p1",
        name: "Wireless Bluetooth Earbuds",
        variant: "Color: Black",
        price: 29.99,
        quantity: 2,
        stock: 15,
        image:
          "https://images.unsplash.com/photo-1606741965583-5c4b0a5e4b0a?w=200",
        slug: "wireless-earbuds",
        selected: true,
      },
      {
        id: "p2",
        name: "Smart Watch Fitness Tracker",
        variant: "Size: M",
        price: 49.99,
        quantity: 1,
        stock: 8,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
        slug: "smart-watch",
        selected: true,
      },
    ],
  },
  {
    sellerId: "s2",
    sellerName: "Fashion World",
    messageSeller: true,
    items: [
      {
        id: "p3",
        name: "Men's Casual Sneakers",
        variant: "Color: White, Size: 42",
        price: 59.99,
        quantity: 1,
        stock: 3,
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200",
        slug: "casual-sneakers",
        selected: true,
      },
    ],
  },
];

export default function CartPage() {
  const [cartData, setCartData] = useState(initialCartData);

  // Helper to update an item in a seller group
  const updateItem = (sellerId, itemId, updates) => {
    setCartData((prev) =>
      prev.map((seller) =>
        seller.sellerId === sellerId
          ? {
              ...seller,
              items: seller.items.map((item) =>
                item.id === itemId ? { ...item, ...updates } : item,
              ),
            }
          : seller,
      ),
    );
  };

  // Remove item from cart
  const removeItem = (sellerId, itemId) => {
    if (!confirm("Remove this item from your cart?")) return;
    setCartData((prev) =>
      prev
        .map((seller) => ({
          ...seller,
          items: seller.items.filter((item) => item.id !== itemId),
        }))
        .filter((seller) => seller.items.length > 0),
    );
  };

  // Toggle select all for a seller
  const toggleSelectAll = (sellerId, selectAll) => {
    setCartData((prev) =>
      prev.map((seller) =>
        seller.sellerId === sellerId
          ? {
              ...seller,
              items: seller.items.map((item) => ({
                ...item,
                selected: selectAll,
              })),
            }
          : seller,
      ),
    );
  };

  // Toggle select all across all sellers
  const toggleSelectAllGlobal = (selectAll) => {
    setCartData((prev) =>
      prev.map((seller) => ({
        ...seller,
        items: seller.items.map((item) => ({ ...item, selected: selectAll })),
      })),
    );
  };

  // Remove selected items
  const removeSelected = () => {
    if (!confirm("Remove selected items?")) return;
    setCartData((prev) =>
      prev
        .map((seller) => ({
          ...seller,
          items: seller.items.filter((item) => !item.selected),
        }))
        .filter((seller) => seller.items.length > 0),
    );
  };

  // Save for later (mock – we just remove from cart)
  const saveForLater = (sellerId, itemId) => {
    // In a real app, you'd move to a "saved" list
    removeItem(sellerId, itemId);
  };

  // Apply promo code
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(10);
    } else {
      alert("Invalid promo code");
    }
  };

  // Calculate totals
  const selectedItems = cartData.flatMap((seller) =>
    seller.items.filter((item) => item.selected),
  );
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10; // free shipping over $100
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax - discount;

  const allSelected = cartData.every((seller) =>
    seller.items.every((item) => item.selected),
  );

  if (cartData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <FiShoppingCart className="mx-auto text-6xl text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link
          href="/"
          className="inline-block bg-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange/90"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span>Home</span> &gt; <span className="text-gray-800">Cart</span>
      </div>

      <h1 className="text-2xl font-bold mb-2">
        Shopping Cart ({selectedItems.length}{" "}
        {selectedItems.length === 1 ? "item" : "items"})
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column – main cart */}
        <div className="lg:w-2/3">
          {/* Select all row */}
          <div className="bg-white p-4 border rounded-lg mb-4 flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => toggleSelectAllGlobal(e.target.checked)}
                className="w-5 h-5 accent-orange"
              />
              <span className="font-medium">Select All</span>
            </label>
            <button
              onClick={removeSelected}
              className="text-gray-500 hover:text-orange text-sm"
            >
              Remove Selected
            </button>
          </div>

          {/* Seller groups */}
          <div className="space-y-4">
            {cartData.map((seller) => {
              const sellerSelected = seller.items.every(
                (item) => item.selected,
              );
              return (
                <div
                  key={seller.sellerId}
                  className="bg-white border rounded-lg overflow-hidden"
                >
                  {/* Seller header */}
                  <div className="bg-gray-50 p-4 border-b flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={sellerSelected}
                        onChange={(e) =>
                          toggleSelectAll(seller.sellerId, e.target.checked)
                        }
                        className="w-5 h-5 accent-orange"
                      />
                      <span className="font-semibold">{seller.sellerName}</span>
                      {seller.messageSeller && (
                        <button className="text-sm text-orange hover:underline">
                          Message Seller
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Items for this seller */}
                  {seller.items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      sellerId={seller.sellerId}
                      onUpdate={updateItem}
                      onRemove={removeItem}
                      onSaveLater={saveForLater}
                    />
                  ))}
                </div>
              );
            })}
          </div>

          {/* You May Also Like placeholder */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border rounded p-2">
                  <div className="h-24 bg-gray-200 mb-2"></div>
                  <div className="h-4 bg-gray-200 w-3/4 mb-1"></div>
                  <div className="h-4 bg-gray-200 w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column – summary */}
        <div className="lg:w-1/3">
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            discount={discount}
            total={total}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            applyPromo={applyPromo}
          />
        </div>
      </div>
    </div>
  );
}
