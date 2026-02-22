// components/cart/CartSummary.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { FiShield, FiLock } from "react-icons/fi";

const CartSummary = ({ subtotal, onCheckout }) => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  const shipping = 5.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax - discount;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(subtotal * 0.1);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 sticky top-24">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span className="text-[#FF6600]">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Promo code */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Promo Code</label>
        <div className="flex">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter code"
            className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
          />
          <button
            onClick={applyPromo}
            className="px-4 py-2 bg-gray-700 text-white rounded-r text-sm hover:bg-gray-800"
          >
            Apply
          </button>
        </div>
        {promoError && (
          <p className="text-red-500 text-xs mt-1">{promoError}</p>
        )}
      </div>

      {/* Checkout button */}
      <button
        onClick={onCheckout}
        className="w-full bg-[#FF6600] text-white py-3 rounded-md font-medium hover:bg-[#e65c00] transition-colors mb-3"
      >
        Proceed to Checkout
      </button>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <FiLock className="text-green-600" size={14} />
          Secure Payment
        </div>
        <div className="flex items-center gap-1">
          <FiShield className="text-blue-600" size={14} />
          Buyer Protection
        </div>
      </div>

      <div className="mt-3 text-center">
        <Link
          href="/products"
          className="text-sm text-[#FF6600] hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
